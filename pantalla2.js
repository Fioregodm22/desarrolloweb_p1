let pokemoneslista = []; // array pokemones

document.addEventListener('DOMContentLoaded', async function() {
    await cargarTodosLosPokemones();
    configurarFiltros();
}); //espera


async function cargarTodosLosPokemones() {
    try {
  
        // peticiones
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        // detalles
        const promesas = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        pokemoneslista = await Promise.all(promesas);
        

        // Mostrar todos al inicio
        mostrarPokemones(pokemoneslista);
        
    } catch (error) {
        console.error('Error al cargar Pokémon:', error);
        document.getElementById('pokemon-container').innerHTML = 
            '<p style="color: red;">Error al cargar los Pokémon</p>';
    }
}

// mostrar lista
function mostrarPokemones(pokemones) {
    const container = document.getElementById('pokemon-container');
    
<<<<<<< Updated upstream

    const nombrebien = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    
   
    container.innerHTML = `
        <div class="pokemon-card">
            <h2 class="ubuntu-bold">${nombrebien}</h2>
            <img src="${imagen}" alt="${nombrebien}" class="pokemon-image">
        </div>
    `;
=======
    if (pokemones.length === 0) {
        container.innerHTML = '<p style="color: #666;">No se encontraron Pokémon</p>';
        return;
    }
    
    const html = pokemones.map(pokemon => {
        const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const imagen = pokemon.sprites.front_default;
        const id = pokemon.id;
        const tipos = pokemon.types.map(t => t.type.name).join(', ');
       
        const poder = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
        
        return `
            <div class="pokemon-card">
                <span class="pokemon-id">#${id}</span>
                <h3 class="ubuntu-bold">${nombre}</h3>
                <img src="${imagen}" alt="${nombre}" class="pokemon-image">
                <div class="pokemon-info">
                    <p><strong>Tipo:</strong> ${tipos}</p>
                    <p><strong>Poder:</strong> ${poder}</p>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `<div class="pokemon-grid">${html}</div>`;
}

// Configurar filtros
function configurarFiltros() {
    const filtroId = document.getElementById('filtro-id');
    const filtroNombre = document.getElementById('filtro-nombre');
    const filtroTipo = document.getElementById('filtro-tipo');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpiar = document.getElementById('btn-limpiar');
    
    btnFiltrar.addEventListener('click', filtrarPokemones);
    btnLimpiar.addEventListener('click', limpiarFiltros);
   
}

// Filtrar Pokémon
function filtrarPokemones() {
    const filtroId = document.getElementById('filtro-id').value.trim();
    const filtroNombre = document.getElementById('filtro-nombre').value.trim().toLowerCase();
    const filtroTipo = document.getElementById('filtro-tipo').value.toLowerCase();
    
    let pokemonesFiltrados = todosLosPokemones;
    
    // Filtrar por ID
    if (filtroId !== '') {
        pokemonesFiltrados = pokemonesFiltrados.filter(p => p.id === parseInt(filtroId));
    }
    
    // Filtrar por nombre
    if (filtroNombre !== '') {
        pokemonesFiltrados = pokemonesFiltrados.filter(p => p.name.includes(filtroNombre));
    }
    
    // Filtrar por tipo
    if (filtroTipo !== '') {
        pokemonesFiltrados = pokemonesFiltrados.filter(p => 
            p.types.some(t => t.type.name === filtroTipo)
        );
    }
    
    mostrarPokemones(pokemonesFiltrados);
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtro-id').value = '';
    document.getElementById('filtro-nombre').value = '';
    document.getElementById('filtro-tipo').value = '';
    mostrarPokemones(pokemoneslista);
>>>>>>> Stashed changes
}