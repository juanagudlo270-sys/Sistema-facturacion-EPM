import { ServicioProducto } from '../services/ServicioProducto.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const ControllerProducto = {
  listar: asyncHandler(async (req, res) => {
    res.json(await ServicioProducto.listar());
  }),
  obtener: asyncHandler(async (req, res) => {
    res.json(await ServicioProducto.obtener(req.params.id));
  }),
  crear: asyncHandler(async (req, res) => {
    res.status(201).json(await ServicioProducto.crear(req.body));
  }),
  actualizar: asyncHandler(async (req, res) => {
    res.json(await ServicioProducto.actualizar(req.params.id, req.body));
  }),
  eliminar: asyncHandler(async (req, res) => {
    res.json(await ServicioProducto.eliminar(req.params.id));
  }),
};
