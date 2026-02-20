document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validación
    if (correo === 'pedrolopez@gmail.com' && password === '1234' ||
     correo === 'mariagzz@gmail.com' && password === '5678'
    || correo === 'joseramirez@gmail.com' && password === '2200' ) {
    
        window.location.href = 'pagina2.html';
    } else {
    
        errorMessage.style.display = 'block';
        
    
        setTimeout(function() {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});