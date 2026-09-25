import { ServicioFactura } from '../services/ServicioFactura.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const ControllerFactura = {
  // GET /api/facturas?estado=emitida&clienteId=3
  listar: asyncHandler(async (req, res) => {
    const { estado, clienteId } = req.query;
    res.json(await ServicioFactura.listar({ estado, clienteId }));
  }),
  obtener: asyncHandler(async (req, res) => {
    res.json(await ServicioFactura.obtener(req.params.id));
  }),
  crear: asyncHandler(async (req, res) => {
    res.status(201).json(await ServicioFactura.crear(req.body));
  }),
  pagar: asyncHandler(async (req, res) => {
    res.json(await ServicioFactura.pagar(req.params.id));
  }),
  anular: asyncHandler(async (req, res) => {
    res.json(await ServicioFactura.anular(req.params.id));
  }),
};
