import { ServicioUsuario } from '../services/ServicioUsuario.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const ControllerUsuario = {
  listar: asyncHandler(async (req, res) => {
    res.json(await ServicioUsuario.listar());
  }),
  obtener: asyncHandler(async (req, res) => {
    res.json(await ServicioUsuario.obtener(req.params.id));
  }),
  crear: asyncHandler(async (req, res) => {
    res.status(201).json(await ServicioUsuario.crear(req.body));
  }),
  actualizar: asyncHandler(async (req, res) => {
    res.json(await ServicioUsuario.actualizar(req.params.id, req.body));
  }),
  eliminar: asyncHandler(async (req, res) => {
    res.json(await ServicioUsuario.eliminar(req.params.id));
  }),
};
