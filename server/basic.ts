import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba simple
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta básica de estudiantes
app.get('/api/students', (req, res) => {
  res.json({ 
    message: 'Endpoint de estudiantes funcionando',
    students: [],
    total: 0
  });
});

// Ruta básica de assessment
app.get('/api/assessment', (req, res) => {
  res.json({ 
    message: 'Endpoint de assessment funcionando'
  });
});

// Manejo de errores básico
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express ejecutándose en puerto ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Students API: http://localhost:${PORT}/api/students`);
  console.log(`📝 Assessment API: http://localhost:${PORT}/api/assessment`);
});

export default app;
