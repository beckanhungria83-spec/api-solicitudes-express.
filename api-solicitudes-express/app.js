const express = require('express');
const app = express();
const PORT = 5000;

app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.use(express.json());

app.get('/inicio', (req, res) => {
    res.json({ "mensaje": "¡Bienvenido a la API de solicitudes!" });
});

app.get('/informacion', (req, res) => {
    res.json({
        "servicio": "API de registro de solicitudes",
        "descripcion": "Recibe solicitudes de personas interesadas en los servicios"
    });
});

app.post('/solicitudes', (req, res) => {
    try {
        const { nombre, apellido, correo } = req.body || {};

        if (!nombre || !apellido || !correo) {
            return res.status(400).json({ "error": "nombre, apellido y correo son obligatorios" });
        }

        if (!correo.includes('@') || !correo.includes('.')) {
            return res.status(400).json({ "error": "El correo no tiene un formato válido" });
        }

        res.status(201).json({ "mensaje": "Solicitud recibida" });
    } catch (error) {
        res.status(400).json({ "error": "Formato JSON inválido" });
    }
});

app.use((req, res) => {
    res.status(404).json({ "error": "La ruta no existe" });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ "error": "Error interno del servidor" });
});

/* puerto */
app.listen(PORT, () => {
    console.log("servidor ejecutandose correctamente " + PORT);
});