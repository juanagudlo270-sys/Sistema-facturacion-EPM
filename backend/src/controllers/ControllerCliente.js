import { ServicioCliente } from '../services/ServicioCliente.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const ControllerCliente = {
  listar: asyncHandler(async (req, res) => {
    res.json(await ServicioCliente.listar());
  }),
  obtener: asyncHandler(async (req, res) => {
    res.json(await ServicioCliente.obtener(req.params.id));
  }),
  crear: asyncHandler(async (req, res) => {
    res.status(201).json(await ServicioCliente.crear(req.body));
  }),
  actualizar: asyncHandler(async (req, res) => {
    res.json(await ServicioCliente.actualizar(req.params.id, req.body));
  }),
  eliminar: asyncHandler(async (req, res) => {
    res.json(await ServicioCliente.eliminar(req.params.id));
  }),
};
