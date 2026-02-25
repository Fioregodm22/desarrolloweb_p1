document.addEventListener('DOMContentLoaded', async function() {
    
    try {
        //peticion pokeapi
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/lugia`);
        
        if (!response.ok) {
            throw new Error('no encontrado');
        }
        
        const pokemon = await response.json();
        
        // extraccion
        const nombre = pokemon.name;
       // const imagen = pokemon.sprites.other['official-artwork'].front_default;
       
        const imagen = pokemon.sprites.front_default;
        
        console.log('Pokémon:');
        console.log('Nombre:', nombre);
        console.log('Imagen:', imagen);
        
        mostrarPokemon(nombre, imagen, pokemon);
        
    } catch (error) {
        console.error('Error :', error);
    
    }
});

function mostrarPokemon(nombre, imagen, datosPokemon) {
    const container = document.getElementById('pokemon-container');
    
    // Capitalizar nombre
    const nombrebien = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    
    // Crear HTML con los datos del Pokémon
    container.innerHTML = `
        <div class="pokemon-card">
            <h2 class="ubuntu-bold">${nombrebien}</h2>
            <img src="${imagen}" alt="${nombrebien}" class="pokemon-image">
        </div>
    `;
}