import { Router } from 'express';
import { ControllerFactura } from '../controllers/ControllerFactura.js';

const router = Router();

router.get('/', ControllerFactura.listar);
router.get('/:id', ControllerFactura.obtener);
router.post('/', ControllerFactura.crear);
router.patch('/:id/pagar', ControllerFactura.pagar);
router.patch('/:id/anular', ControllerFactura.anular);
// No hay DELETE: una factura no se borra, se anula.

export default router;
