import express from 'express';
import mongoose from 'mongoose';
import tareaRoutes from './routes/tarea.routes';
import userRoutes from './routes/users.routes';

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api', tareaRoutes);
app.use('/api', userRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://axslarli14:hIwwcKzM54wBtDGu@cluster0.afhrgjc.mongodb.net/Backend?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB Atlas:', error);
    });