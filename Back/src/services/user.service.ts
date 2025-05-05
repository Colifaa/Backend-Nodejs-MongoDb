import bcrypt from 'bcryptjs';
import Users from '../models/Users.model';

// Registrar un nuevo usuario
export const registrarUsuario = async (username: string, email:string, password: string) => {
    const hashedPassword= await bcrypt.hash(password,10) // Hashea la contraseña
const newUser = new Users({
    username,email,password:hashedPassword
});
return newUser.save();

};

// Iniciar sesión de un usuario
export const iniciarSesion = async (email: string,password:string) => {
const user = await Users.findOne({email});
if(!user) throw new Error("Usuario no encontrado");

const isMatch = await bcrypt.compare(password,user.password); // Compara contraseñas
if (!isMatch) throw new Error ("Contraseña incorrecta");

return user;

};

export const obtenerUsuarios = async (page: number = 1, limit: number = 10) => {
    try {
        const skip = (page - 1) * limit;
        const usuarios = await Users.find({}, { password: 0 })
            .skip(skip)
            .limit(limit);
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
};