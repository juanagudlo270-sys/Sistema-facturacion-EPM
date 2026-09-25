import { Router } from 'express';
import { ControllerProducto } from '../controllers/ControllerProducto.js';

const router = Router();

router.get('/', ControllerProducto.listar);
router.get('/:id', ControllerProducto.obtener);
router.post('/', ControllerProducto.crear);
router.put('/:id', ControllerProducto.actualizar);
router.delete('/:id', ControllerProducto.eliminar);

export default router;
