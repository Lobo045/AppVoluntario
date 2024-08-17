const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

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

// **Usuarios**
// Endpoint para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const query = 'SELECT * FROM Usuarios WHERE correo = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario.', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        const insertQuery = 'INSERT INTO Usuarios (nombre, correo, contraseña, fecha_registro, tipo_usuario) VALUES (?, ?, ?, NOW(), "voluntario")';
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
    const query = 'SELECT * FROM Usuarios';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los usuarios.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Voluntarios**
// Endpoint para registrar un nuevo voluntario
app.post('/api/voluntarios', (req, res) => {
    const { usuario_id, intereses, disponibilidad } = req.body;

    const query = 'INSERT INTO Voluntarios (usuario_id, fecha_registro, intereses, disponibilidad) VALUES (?, NOW(), ?, ?)';
    db.query(query, [usuario_id, intereses, disponibilidad], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el voluntario.', error: err });
        }
        res.status(201).json({ message: 'Voluntario registrado exitosamente.' });
    });
});

// Endpoint para obtener todos los voluntarios
app.get('/api/voluntarios', (req, res) => {
    const query = 'SELECT * FROM Voluntarios';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los voluntarios.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Proyectos**
// Endpoint para crear un nuevo proyecto
app.post('/api/proyectos', (req, res) => {
    const { nombre_proyecto, descripcion, fecha_inicio, fecha_fin, ubicacion, estado } = req.body;

    const query = 'INSERT INTO Proyectos (nombre_proyecto, descripcion, fecha_inicio, fecha_fin, ubicacion, estado) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre_proyecto, descripcion, fecha_inicio, fecha_fin, ubicacion, estado], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el proyecto.', error: err });
        }
        res.status(201).json({ message: 'Proyecto creado exitosamente.' });
    });
});

// Endpoint para obtener todos los proyectos
app.get('/api/proyectos', (req, res) => {
    const query = 'SELECT * FROM Proyectos';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los proyectos.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Asignaciones**
// Endpoint para asignar un voluntario a un proyecto
app.post('/api/asignaciones', (req, res) => {
    const { voluntario_id, proyecto_id, rol } = req.body;

    const query = 'INSERT INTO Asignaciones (voluntario_id, proyecto_id, fecha_asignacion, rol) VALUES (?, ?, NOW(), ?)';
    db.query(query, [voluntario_id, proyecto_id, rol], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al asignar el voluntario al proyecto.', error: err });
        }
        res.status(201).json({ message: 'Voluntario asignado exitosamente al proyecto.' });
    });
});

// Endpoint para obtener todas las asignaciones
app.get('/api/asignaciones', (req, res) => {
    const query = 'SELECT * FROM Asignaciones';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las asignaciones.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Eventos**
// Endpoint para crear un nuevo evento
app.post('/api/eventos', (req, res) => {
    const { nombre_evento, descripcion, fecha_evento, ubicacion, proyecto_id } = req.body;

    const query = 'INSERT INTO Eventos (nombre_evento, descripcion, fecha_evento, ubicacion, proyecto_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre_evento, descripcion, fecha_evento, ubicacion, proyecto_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el evento.', error: err });
        }
        res.status(201).json({ message: 'Evento creado exitosamente.' });
    });
});

// Endpoint para obtener todos los eventos
app.get('/api/eventos', (req, res) => {
    const query = 'SELECT * FROM Eventos';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los eventos.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Habilidades**
// Endpoint para agregar una nueva habilidad
app.post('/api/habilidades', (req, res) => {
    const { nombre_habilidad, descripcion } = req.body;

    const query = 'INSERT INTO Habilidades (nombre_habilidad, descripcion) VALUES (?, ?)';
    db.query(query, [nombre_habilidad, descripcion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al agregar la habilidad.', error: err });
        }
        res.status(201).json({ message: 'Habilidad agregada exitosamente.' });
    });
});

// Endpoint para obtener todas las habilidades
app.get('/api/habilidades', (req, res) => {
    const query = 'SELECT * FROM Habilidades';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las habilidades.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Voluntario_Habilidades**
// Endpoint para asignar una habilidad a un voluntario
app.post('/api/voluntarios/:id/habilidades', (req, res) => {
    const { id } = req.params;
    const { habilidad_id, nivel } = req.body;

    const query = 'INSERT INTO Voluntario_Habilidades (voluntario_id, habilidad_id, nivel) VALUES (?, ?, ?)';
    db.query(query, [id, habilidad_id, nivel], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al asignar la habilidad al voluntario.', error: err });
        }
        res.status(201).json({ message: 'Habilidad asignada exitosamente al voluntario.' });
    });
});

// Endpoint para obtener todas las habilidades de un voluntario
app.get('/api/voluntarios/:id/habilidades', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT h.nombre_habilidad, vh.nivel 
        FROM Voluntario_Habilidades vh 
        JOIN Habilidades h ON vh.habilidad_id = h.habilidad_id 
        WHERE vh.voluntario_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las habilidades del voluntario.', error: err });
        }
        res.status(200).json(results);
    });
});

// **Feedback**
// Endpoint para agregar un nuevo feedback
app.post('/api/feedback', (req, res) => {
    const { asignacion_id, comentarios, calificacion } = req.body;

    const query = 'INSERT INTO Feedback (asignacion_id, fecha_feedback, comentarios, calificacion) VALUES (?, NOW(), ?, ?)';
    db.query(query, [asignacion_id, comentarios, calificacion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al agregar el feedback.', error: err });
        }
        res.status(201).json({ message: 'Feedback agregado exitosamente.' });
    });
});

// Endpoint para obtener todos los feedbacks
app.get('/api/feedback', (req, res) => {
    const query = 'SELECT * FROM Feedback';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los feedbacks.', error: err });
        }
        res.status(200).json(results);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
