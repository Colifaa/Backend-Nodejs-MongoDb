import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para definir la estructura de una tarea
export interface ITarea extends Document {
    title: string; // Título de la tarea
    contenido: string; // Contenido de la tarea
    completada: boolean; // Estado de la tarea
    userId: mongoose.Schema.Types.ObjectId; // Referencia al usuario (ObjectId)
}

// Esquema de la tarea
const taskSchema = new Schema<ITarea>({
    title: {
        type: String,
        required: true // El título es obligatorio
    },
    contenido: {
        type: String,
        required: true // El contenido es obligatorio
    },
    completada: {
        type: Boolean, // Nota: Aquí estaba el error (Type -> type)
        default: false // Por defecto, la tarea no está completada
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo User
        ref: 'User', // Nombre del modelo al que hace referencia
        required: [true, 'El userId es requerido'] // El userId es obligatorio
    }
}, {
    timestamps: true // Añade automáticamente createdAt y updatedAt
});

// Modelo
const Tarea = mongoose.model<ITarea>('Tarea', taskSchema);

export default Tarea;