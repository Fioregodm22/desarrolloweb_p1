//los que estan guardados en datos usuarios login
//login correcto
//token 

//falta otra pagina y ahora hay q bloquearlas 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
 
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;
        const soda = document.getElementById('soda').value;
        const cantidad = document.getElementById('cantidad').value;
        

        const datosFormulario = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            password: password,
            sodaPreferida: soda,
            cantidadAlDia: cantidad
        };
        
        try {
            // Enviar datos al servidor
            const response = await fetch('http://localhost:3000/guardar-datos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFormulario)
            });
            
            const resultado = await response.json();
            
            if (resultado.success) {
                // redirigir a pagina2.html
                window.location.href = 'pagina2.html';
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al guardar los datos. Asegúrate de que el servidor esté corriendo.');
        }
    });
});