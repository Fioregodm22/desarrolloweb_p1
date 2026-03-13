let pokemoneslista = [];
let pokemon1 = null;
let pokemon2 = null;
let turnoActual = 0;
let turnosSinDefensa1 = 0;
let turnosSinDefensa2 = 0;
const MAX_TURNOS = 3; 

document.addEventListener('DOMContentLoaded', async function() {
    await cargarPokemones();
    configurarEventos();
});

async function cargarPokemones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const promesas = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        pokemoneslista = await Promise.all(promesas);
        
        llenarSelectores();
    } catch (error) {
        console.error('Error al cargar Pokémon:', error);
    }
}

function llenarSelectores() {
    const select1 = document.getElementById('pokemon1-select');
    const select2 = document.getElementById('pokemon2-select');
    
    const opciones = pokemoneslista.map(p => {
        const nombre = p.name.charAt(0).toUpperCase() + p.name.slice(1);
        return `<option value="${p.id}">#${p.id} - ${nombre}</option>`;
    }).join('');
    
    select1.innerHTML = '<option value="">Selecciona un Pokémon</option>' + opciones;
    select2.innerHTML = '<option value="">Selecciona un Pokémon</option>' + opciones;
}

function configurarEventos() {
    document.getElementById('btn-iniciar-batalla').addEventListener('click', iniciarBatalla);
    document.getElementById('btn-turno').addEventListener('click', ejecutarTurno);
    document.getElementById('btn-reiniciar').addEventListener('click', reiniciarBatalla);
    document.getElementById('btn-otra-batalla').addEventListener('click', reiniciarBatalla);
}

function iniciarBatalla() {
    const id1 = parseInt(document.getElementById('pokemon1-select').value);
    const id2 = parseInt(document.getElementById('pokemon2-select').value);
    
    if (!id1 || !id2) {
        alert('Debes seleccionar dos Pokémon');
        return;
    }
    
    if (id1 === id2) {
        alert('Debes seleccionar Pokémon diferentes');
        return;
    }
    
    pokemon1 = crearPokemonBatalla(pokemoneslista.find(p => p.id === id1));
    pokemon2 = crearPokemonBatalla(pokemoneslista.find(p => p.id === id2));
    
    turnoActual = 0;
    turnosSinDefensa1 = 0;
    turnosSinDefensa2 = 0;
    
    mostrarArena();
}

function crearPokemonBatalla(pokemon) {
    return {
        id: pokemon.id,
        nombre: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        imagen: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        hp: 100,
        ataque: pokemon.stats[1].base_stat,
        defensa: pokemon.stats[2].base_stat,
        velocidad: pokemon.stats[5].base_stat
    };
}

function mostrarArena() {
    document.getElementById('seleccion-container').style.display = 'none';
    document.getElementById('batalla-container').style.display = 'block';
    document.getElementById('victoria-container').style.display = 'none';
    
    // Pokémon 1
    document.getElementById('pokemon1-nombre').textContent = pokemon1.nombre;
    document.getElementById('pokemon1-imagen').src = pokemon1.imagen;
    document.getElementById('pokemon1-hp').textContent = pokemon1.hp;
    document.getElementById('pokemon1-ataque').textContent = pokemon1.ataque;
    document.getElementById('pokemon1-defensa').textContent = pokemon1.defensa;
    document.getElementById('pokemon1-vida').style.width = '100%';
    
    // Pokémon 2
    document.getElementById('pokemon2-nombre').textContent = pokemon2.nombre;
    document.getElementById('pokemon2-imagen').src = pokemon2.imagen;
    document.getElementById('pokemon2-hp').textContent = pokemon2.hp;
    document.getElementById('pokemon2-ataque').textContent = pokemon2.ataque;
    document.getElementById('pokemon2-defensa').textContent = pokemon2.defensa;
    document.getElementById('pokemon2-vida').style.width = '100%';
    
    document.getElementById('log-container').innerHTML = '<p class="log-inicio">¡La batalla comienza! (Máximo 3 turnos)</p>';
}

function ejecutarTurno() {
    turnoActual++;
    

    let primero, segundo, esPrimero1;
    if (pokemon1.velocidad >= pokemon2.velocidad) {
        primero = pokemon1;
        segundo = pokemon2;
        esPrimero1 = true;
    } else {
        primero = pokemon2;
        segundo = pokemon1;
        esPrimero1 = false;
    }
    
    agregarLog(`<strong>TURNO ${turnoActual}</strong>`);
    

    realizarAtaque(primero, segundo, esPrimero1 ? 1 : 2, esPrimero1 ? 2 : 1);
    
 
    if (segundo.hp > 0) {
        realizarAtaque(segundo, primero, esPrimero1 ? 2 : 1, esPrimero1 ? 1 : 2);
    }
    

    if (turnoActual >= MAX_TURNOS || pokemon1.hp <= 0 || pokemon2.hp <= 0) {
        mostrarGanador();
    }
}

function realizarAtaque(atacante, defensor, numAtacante, numDefensor) {

    if (numAtacante === 1) turnosSinDefensa1++;
    else turnosSinDefensa2++;
    
  
    const puedeDefensaEspecial = (numAtacante === 1 ? turnosSinDefensa1 : turnosSinDefensa2) >= 2;
    const usaDefensaEspecial = puedeDefensaEspecial && Math.random() < 0.25; // 25% chance
    
    if (usaDefensaEspecial) {
        const falla = Math.random() < 0.15; // 15% chance de fallar
        if (falla) {
            agregarLog(`${atacante.nombre} intenta usar Defensa Especial pero ¡FALLA!`);
        } else {
            agregarLog(`${atacante.nombre} usa Defensa Especial y se protege completamente este turno!`);
            if (numAtacante === 1) turnosSinDefensa1 = 0;
            else turnosSinDefensa2 = 0;
        }
        return;
    }
    
    // Ataque normal
    const falla = Math.random() < 0.1; // 10% chance de fallar
    if (falla) {
        agregarLog(`${atacante.nombre} ataca pero ¡FALLA!`);
        return;
    }
    
    // Calcular daño
    const multiplicador = 0.5 + Math.random() * 0.5; // Entre 0.5 y 1.0
    const danioBase = (atacante.ataque / defensor.defensa) * 20 * multiplicador;
    const danio = Math.round(danioBase);
    
    defensor.hp = Math.max(0, defensor.hp - danio);
    
    agregarLog(`${atacante.nombre} ataca a ${defensor.nombre} y hace <strong>${danio}%</strong> de daño!`);
    agregarLog(`A ${defensor.nombre} le quedan <strong>${defensor.hp}%</strong> de vida`);
    
    // Actualizar UI
    actualizarVida(numDefensor, defensor.hp);
}

function actualizarVida(numPokemon, hp) {
    const hpElement = document.getElementById(`pokemon${numPokemon}-hp`);
    const vidaElement = document.getElementById(`pokemon${numPokemon}-vida`);
    
    hpElement.textContent = hp;
    vidaElement.style.width = hp + '%';
    
    // Cambiar color según vida restante
    if (hp > 50) {
        vidaElement.style.backgroundColor = '#4caf50';
    } else if (hp > 25) {
        vidaElement.style.backgroundColor = '#ff9800';
    } else {
        vidaElement.style.backgroundColor = '#f44336';
    }
}

function agregarLog(mensaje) {
    const logContainer = document.getElementById('log-container');
    const p = document.createElement('p');
    p.innerHTML = mensaje;
    logContainer.appendChild(p);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function mostrarGanador() {
    document.getElementById('btn-turno').disabled = true;
    
    let ganador;
    let mensaje;
    
    if (pokemon1.hp <= 0 && pokemon2.hp <= 0) {
        // Empate
        agregarLog(`<strong class="ganador-log">Es un EMPATE </strong>`);
        ganador = pokemon1.hp === pokemon2.hp ? pokemon1 : (pokemon1.hp > pokemon2.hp ? pokemon1 : pokemon2);
        mensaje = 'EMPATE';
    } else if (pokemon1.hp <= 0) {
        // Gana pokemon2
        ganador = pokemon2;
        agregarLog(`<strong class="ganador-log"> ¡${ganador.nombre} gana la batalla! </strong>`);
        mensaje = '¡GANADOR!';
    } else if (pokemon2.hp <= 0) {
        // Gana pokemon1
        ganador = pokemon1;
        agregarLog(`<strong class="ganador-log"> ¡${ganador.nombre} gana la batalla!</strong>`);
        mensaje = '¡GANADOR!';
    } else {
        // Se acabaron los 3 turnos - gana el que tenga más vida
        ganador = pokemon1.hp > pokemon2.hp ? pokemon1 : pokemon2;
        agregarLog(`<strong class="ganador-log"> ¡Se acabó el tiempo! ${ganador.nombre} gana por mayor vida restante (${ganador.hp}% vs ${ganador === pokemon1 ? pokemon2.hp : pokemon1.hp}%) ⏱️</strong>`);
        mensaje = '¡GANADOR POR PUNTOS!';
    }
    
    setTimeout(() => {
        document.getElementById('batalla-container').style.display = 'none';
        document.getElementById('victoria-container').style.display = 'block';
        document.getElementById('ganador-imagen').src = ganador.imagen;
        document.getElementById('ganador-nombre').textContent = ganador.nombre;
        document.querySelector('.ganador-text').textContent = ` ${mensaje} `;
    }, 2000);
}

function reiniciarBatalla() {
    document.getElementById('btn-turno').disabled = false;
    document.getElementById('seleccion-container').style.display = 'block';
    document.getElementById('batalla-container').style.display = 'none';
    document.getElementById('victoria-container').style.display = 'none';
    
    pokemon1 = null;
    pokemon2 = null;
    turnoActual = 0;
    turnosSinDefensa1 = 0;
    turnosSinDefensa2 = 0;
}