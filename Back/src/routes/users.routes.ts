import { Router } from 'express';
import { registrarUsuarioController, iniciarSesionController, obtenerUsuariosController } from '../controllers/user.controllers';

const router = Router();

// Rutas para usuarios
router.post('/registro', registrarUsuarioController); // Registrar un usuario
router.post('/login', iniciarSesionController); // Iniciar sesión
router.get("/users",obtenerUsuariosController)

export default router;