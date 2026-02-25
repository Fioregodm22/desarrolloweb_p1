

// Navbar
const navbarHTML = `
<header>
    <nav class="navbar">
        <span class="navbar-brand ubuntu-bold">Fiorella de Medina</span>
        <ul class="navbar-links">
            <li><a href="primerentrega.html">Inicio</a></li>
            <li><a href="formulario.html">Formulario de sodas</a></li>
            <li><a href="pagina3.html">Recomendaciones</a></li>
        </ul>
    </nav>
</header>
`;

// Footer
const footerHTML = `
<footer class="footer">
    <p class="ubuntu-regular">&copy; 2026 Fiorella de Medina. Todos los derechos reservados.</p>
</footer>
`;

function cargarComponentes() {
    // Insertar navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = navbarHTML;
    }
    
    // Insertar footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
    
    console.log('✓ Componentes cargados');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarComponentes);
} else {
    cargarComponentes();
}