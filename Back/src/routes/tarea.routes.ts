import{Router} from "express" ;

import {
    obtenerTareasPorUsuarioController,
    crearTareaController,
    actualizarTareaController,
    eliminarTareaController
} from '../controllers/Task.controllers';

const router = Router();

// Rutas para tareas

router.get("/:userId/tareas",obtenerTareasPorUsuarioController)
router.post("/:userId/tareas",crearTareaController)
router.put('/tareas/:id', actualizarTareaController); // Actualizar una tarea
router.delete('/tareas/:id', eliminarTareaController); // Eliminar una tarea

export default router;