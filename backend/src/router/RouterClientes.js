import { Router } from 'express';
import { ControllerCliente } from '../controllers/ControllerCliente.js';

const router = Router();

router.get('/', ControllerCliente.listar);
router.get('/:id', ControllerCliente.obtener);
router.post('/', ControllerCliente.crear);
router.put('/:id', ControllerCliente.actualizar);
router.delete('/:id', ControllerCliente.eliminar);

export default router;
