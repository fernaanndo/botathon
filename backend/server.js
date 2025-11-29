import express from 'express';
import cors from 'cors';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para iniciar sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validar que se proporcionen email y password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email y contraseña son requeridos'
    });
  }
  
  // Consulta para verificar las credenciales del usuario
  const query = 'SELECT Id_usuario, email, rol, Id FROM usuarios WHERE email = ? AND pass = ?';
  
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
    
    // Verificar si se encontró el usuario
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
    
    // Usuario encontrado - devolver información (sin la contraseña)
    const user = results[0];
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.Id_usuario,
        email: user.email,
        rol: user.rol,
        institutoId: user.Id
      }
    });
  });
});

const PORT = process.env.PORT;


// Endpoint para obtener información del instituto por ID
app.get('/api/instituto/:id', (req, res) => {
  const institutoId = req.params.id;
  
  // Validar que se proporcione el ID
  if (!institutoId) {
    return res.status(400).json({
      success: false,
      message: 'ID del instituto es requerido'
    });
  }
  
  // Consulta para obtener la información completa del instituto
  const query = 'SELECT * FROM Institutos WHERE Id = ?';
  
  db.query(query, [institutoId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
    
    // Verificar si se encontró el instituto
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Instituto no encontrado'
      });
    }
    
    // Instituto encontrado - devolver información completa
    const instituto = results[0];
    res.status(200).json({
      success: true,
      message: 'Instituto encontrado',
      instituto: instituto
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});