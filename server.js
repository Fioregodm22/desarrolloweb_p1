const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// Endpoint para recibir datos del formulario
app.post('/guardar-datos', (req, res) => {
    const datos = req.body;
    
    // vs code

    console.log('Nombre:', datos.nombre);
    console.log('Apellido:', datos.apellido);
    console.log('Correo:', datos.correo);
    console.log('Password:', datos.password);
    console.log('Soda Preferida:', datos.sodaPreferida);
    console.log('Cantidad al día:', datos.cantidadAlDia);
    
    // guardar en archivo JSON
    const rutaArchivo = path.join(__dirname, 'datos_usuarios.json');
    
    // 
    let datosExistentes = [];
    if (fs.existsSync(rutaArchivo)) {
        const contenido = fs.readFileSync(rutaArchivo, 'utf8');
        datosExistentes = JSON.parse(contenido);
    }
    
    // agregar nuevos datos
    datosExistentes.push(datos);
    

    fs.writeFileSync(rutaArchivo, JSON.stringify(datosExistentes, null, 2));

    
    res.json({ success: true, message: 'Datos guardados correctamente' });
});

app.listen(PORT, () => {
    console.log(`\n  http://localhost:${PORT}`);
});