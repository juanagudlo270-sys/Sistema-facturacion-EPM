import { AppError } from '../utils/AppError.js';

export function notFound(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  switch (err.name) {
    case 'SequelizeValidationError':
      return res.status(400).json({ error: 'Datos inválidos', detalles: err.errors.map((e) => e.message) });
    case 'SequelizeUniqueConstraintError':
      return res.status(409).json({ error: 'Ya existe un registro con esos datos', detalles: err.errors.map((e) => e.message) });
    case 'SequelizeForeignKeyConstraintError':
      return res.status(409).json({ error: 'No se puede completar la operación: hay registros relacionados' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
