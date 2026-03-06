

(function() {
    const tokenData = localStorage.getItem('authToken');
    
    // Si no hay token, bloquear inmediatamente
    if (!tokenData) {
        console.log('No hay sesión activa');
        alert('Debes iniciar sesión para acceder a esta página');
        window.location.replace('primerentrega.html');
        throw new Error('Sin autenticación'); // Detiene la ejecución
    }
    
    const token = JSON.parse(tokenData);
    const ahora = Date.now();
    
    // Si el token expiró, bloquear inmediatamente
    if (ahora > token.expiracion) {
        console.log(' Sesión expirada (20 segundos transcurridos)');
        localStorage.removeItem('authToken');
        alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        window.location.replace('primerentrega.html');
        throw new Error('Sesión expirada'); 
    }
    
    // Token valido - permitir acceso
    const segundosRestantes = Math.floor((token.expiracion - ahora) / 1000);
    console.log(`Sesión activa - ${segundosRestantes} segundos restantes`);
    
    // verifica cada 5 segundos
    setInterval(function() {
        const tokenActual = localStorage.getItem('authToken');
        if (!tokenActual) {
            alert('Sesión terminada');
            window.location.replace('primerentrega.html');
            return;
        }
        
        const tk = JSON.parse(tokenActual);
        if (Date.now() > tk.expiracion) {
            localStorage.removeItem('authToken');
            alert('Tu sesión ha expirado');
            window.location.replace('primerentrega.html');
        }
    }, 5000);
})();