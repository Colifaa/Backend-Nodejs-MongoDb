import { Request, Response } from 'express';
import { registrarUsuario, iniciarSesion,obtenerUsuarios } from '../services/user.service';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario

export const registrarUsuarioController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body; // Obtiene los datos del usuario
        const usuario = await registrarUsuario(username, email, password);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Iniciar sesión de un usuario
export const iniciarSesionController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; // Obtiene las credenciales
        const usuario = await iniciarSesion(email, password);

        // Genera un token JWT
        const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET || 'secreto', { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        let errorMessage = 'Ocurrió un error inesperado';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(401).json({ message: errorMessage });
    }
};

// Obtener todos los usuarios 

export const obtenerUsuariosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const usuarios = await obtenerUsuarios(page, limit);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};