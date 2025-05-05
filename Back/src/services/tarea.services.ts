import Tarea from "../models/Task.model"


// Obtener todas las tareas de un usuario específico

export const obtenerTareasPorUsuario = async (userId: string ) => {

    return await Tarea.find({userId})

};

// Obtener una tarea específica por ID
export const obtenerTareasPoriD = async (id : string) => {
    return await Tarea.findById(id);

};

//Crear una nueva tarea
export const crearTarea = async (title:string, contenido:string, completada:false , userId:string ) => {

   const nuevaTarea = new Tarea ({ title, contenido, completada, userId });
   return nuevaTarea.save();

};

//Actualizar una nueva tarea

export const updateTarea = async (title:string, contenido:string, completada:boolean, id:string ) => {
return await Tarea.findByIdAndUpdate(
    id,
    {title,contenido,completada},
    {new : true}  // Devuelve el documento actualizado
)
}

// Eliminar una tarea

export const eliminarTarea = async (id: string) => {
    return await Tarea.findByIdAndDelete(id);
};



