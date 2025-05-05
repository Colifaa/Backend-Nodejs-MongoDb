import { Request, Response } from 'express';
import {
    obtenerTareasPorUsuario,
    obtenerTareasPoriD,
    crearTarea,
    updateTarea,
    eliminarTarea,

} from "../services/tarea.services"

// Obtener todas las tareas de un usuario

export const obtenerTareasPorUsuarioController = async (req: Request,res: Response) =>{

    try {
        const { userId } = req.params; // Obtiene el ID del usuario
        const tareas = await obtenerTareasPorUsuario(userId);
        res.json(tareas);
    } catch (error) {
        console.error(error); // Log del error en la consola
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

// Crear una nueva tarea



// Crear una nueva tarea
export const crearTareaController = async (req: Request, res: Response) => {
    try {
        const { title, contenido,completada } = req.body; // Obtiene los datos de la tarea
        const { userId } = req.params; // Obtiene el ID del usuario
        const nuevaTarea = await crearTarea(title, contenido, completada, userId);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error(error); // Log del error en la consola
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// Actualizar una tarea
export const actualizarTareaController = async (
    req: Request<{ id: string }, {}, { title: string; contenido: string; completada: boolean }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params; // Obtiene el ID de la tarea
        const { title, contenido, completada } = req.body; // Obtiene los nuevos datos
        const tareaActualizada = await updateTarea(id, title, completada, contenido);
        
        if (!tareaActualizada) {
            // No uses "return" aquí
            res.status(404).json({ message: 'Tarea no encontrada' });
            return; // Solo usa "return" para detener la ejecución
        }

        res.json(tareaActualizada); // Envía la tarea actualizada como respuesta
    } catch (error) {
        console.error(error); // Log del error en la consola
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea
export const eliminarTareaController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params; // Obtiene el ID de la tarea
        const tareaEliminada = await eliminarTarea(id);
        if (!tareaEliminada) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        res.json({ message: 'Tarea eliminada correctamente' }); // Envía una respuesta exitosa
    } catch (error) {
        console.error(error); // Log del error en la consola
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};