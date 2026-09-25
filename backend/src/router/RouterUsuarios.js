import { Router } from 'express';
import { ControllerUsuario } from '../controllers/ControllerUsuario.js';

const router = Router();

router.get('/', ControllerUsuario.listar);
router.get('/:id', ControllerUsuario.obtener);
router.post('/', ControllerUsuario.crear);
router.put('/:id', ControllerUsuario.actualizar);
router.delete('/:id', ControllerUsuario.eliminar);

export default router;
