const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Tu usuario de MySQL
    password: '12345',  // Tu contraseña de MySQL
    database: 'voluntappdb'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Endpoint para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario.', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        // Insertar nuevo usuario
        const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [name, email, password], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el usuario.', error: err });
            }

            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        });
    });
});

// Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los usuarios.', error: err });
        }
        res.status(200).json(results);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});