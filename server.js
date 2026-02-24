const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// valida contra datos_usuarios.json
app.post('/login', (req, res) => {
    const { correo, password } = req.body;
    
    console.log('Correo:', correo);
    
    const rutaArchivo = path.join(__dirname, 'datos_usuarios.json');
    
    // verificar si existe el archivo
    if (!fs.existsSync(rutaArchivo)) {
        return res.json({ success: false, message: 'No hay usuarios registrados' });
    }
    
    // lee usuarios registrados
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    const usuarios = JSON.parse(contenido);
    
    // buscar usuario con correo y contraseña 
    const usuarioValido = usuarios.find(u => u.correo === correo && u.password === password);
    
    if (usuarioValido) {
        console.log('Login exitoso');
        console.log('Usuario:', usuarioValido.nombre, usuarioValido.apellido);
        res.json({ success: true, usuario: { nombre: usuarioValido.nombre, apellido: usuarioValido.apellido } });
    } else {
        res.json({ success: false, message: 'Correo o contraseña incorrectos' });
    }
});

// guardar nuevos usuarios
app.post('/guardar-datos', (req, res) => {
    const datos = req.body;
    
    console.log('Nombre:', datos.nombre);
    console.log('Apellido:', datos.apellido);
    console.log('Correo:', datos.correo);
    console.log('Password:', datos.password);
    console.log('Soda Preferida:', datos.sodaPreferida);
    console.log('Cantidad al día:', datos.cantidadAlDia);

    
    const rutaArchivo = path.join(__dirname, 'datos_usuarios.json');
    
    let datosExistentes = [];
    if (fs.existsSync(rutaArchivo)) {
        const contenido = fs.readFileSync(rutaArchivo, 'utf8');
        datosExistentes = JSON.parse(contenido);
    }
    
    datosExistentes.push(datos);
    fs.writeFileSync(rutaArchivo, JSON.stringify(datosExistentes, null, 2));
    
    console.log('✓ Usuario registrado correctamente\n');
    res.json({ success: true, message: 'Datos guardados correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});