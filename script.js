async function getPokemon() {
    const nameInput = document.getElementById("pokemonName").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nameInput}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Pokémon não encontrado");

        const data = await res.json();

        telaPrincipal(data)
    } catch (error) {
        document.getElementById("pokemonInfo").innerHTML = `<p>${error.message}</p>`;
    }
}
const container = document.getElementById('character-grid');


let offset = 0;
const limit = 25;

async function loadPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();

    pokemonList.innerHTML = "";
    for (const pokemon of data.results) {
        const res = await fetch(pokemon.url);
        const pokeData = await res.json();

        const div = document.createElement("button");
        div.className = "card";
        const tipo = pokeData.types[0].type.name;
        const cor = corDoTipo(tipo);
        div.style.backgroundColor = cor;

        div.innerHTML = `
<h4>nº ${pokeData.id}</h4>
    <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
    <h3>${pokeData.name.toUpperCase()}</h3>
  `;

        div.onclick = function () {
            telaPrincipal(pokeData);
        };

        pokemonList.appendChild(div);
    }
}

function nextPage() {
    offset += limit;
    loadPokemons();
}

function prevPage() {
    if (offset >= limit) {
        offset -= limit;
        loadPokemons();
    }
}

function corDoTipo(tipo) {
    if (tipo === "normal") return "#A8A77A";
    if (tipo === "fire") return "#EE8130";
    if (tipo === "water") return "#6390F0";
    if (tipo === "electric") return "#F7D02C";
    if (tipo === "grass") return "#7AC74C";
    if (tipo === "ice") return "#96D9D6";
    if (tipo === "fighting") return "#C22E28";
    if (tipo === "poison") return "#A33EA1";
    if (tipo === "ground") return "#E2BF65";
    if (tipo === "flying") return "#A98FF3";
    if (tipo === "psychic") return "#F95587";
    if (tipo === "bug") return "#A6B91A";
    if (tipo === "rock") return "#B6A136";
    if (tipo === "ghost") return "#735797";
    if (tipo === "dragon") return "#6F35FC";
    if (tipo === "dark") return "#705746";
    if (tipo === "steel") return "#B7B7CE";
    if (tipo === "fairy") return "#D685AD";
    return "#777";
}


function telaPrincipal(pokeData) {
    // Reproduz o som do Pokémon
    const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokeData.name.toLowerCase()}.mp3`);
    audio.play();
  
    // Atualiza o conteúdo da tela
    const pokemonList = document.getElementById("tela");
    pokemonList.innerHTML = `
      <h2>${pokeData.name.toUpperCase()}</h2>
      <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
      <h4 style="margin: 0;">ID: ${pokeData.id}</h4>
      <p><strong>Tipo:</strong> ${pokeData.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Altura:</strong> ${(pokeData.height / 10).toFixed(1)} m</p>
      <p><strong>Peso:</strong> ${(pokeData.weight / 10).toFixed(1)} kg</p>
    `;
  }loadPokemons(); 