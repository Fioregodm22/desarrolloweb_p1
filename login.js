document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    try {
        // Solicitar validación al servidor
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });
        
        const resultado = await response.json();
        
        if (resultado.success) {
            // Crear token con tiempo 
            const token = {
                correo: correo,
                expiracion: Date.now() + 20000 // 20 segundos en milisegundos
            };
            
            
            localStorage.setItem('authToken', JSON.stringify(token));
            
            console.log('Login exitoso - Token válido por 20 segundos');
            
          
            window.location.href = 'pagina2.html';
        } else {
            // credenciales incorrectas
            errorMessage.style.display = 'block';
            
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al validar login:', error);
        alert('Error al conectar con el servidor. Asegúrate de que esté corriendo.');
    }
});