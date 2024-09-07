let pokemons = {};
let frasesSarcasticas = [];

// Carregar os dados ao iniciar a página
carregarDados();

async function carregarDados() {
    try {
        // Carregar dados dos Pokémons
        const respostaPokemons = await fetch('pokemons.json');
        pokemons = await respostaPokemons.json();
        
        // Carregar frases sarcásticas
        const respostaFrases = await fetch('frases_sarcasticas.json');
        const dadosFrases = await respostaFrases.json();
        frasesSarcasticas = dadosFrases.frases;
    } catch (erro) {
        console.error('Erro ao carregar os dados:', erro);
    }
}

function buscarPokemonPorSigno(signo) {
    return pokemons[signo];
}

function obterFraseSarcastica() {
    if (frasesSarcasticas.length === 0) return 'Sem frase sarcástica disponível.';
    const indiceAleatorio = Math.floor(Math.random() * frasesSarcasticas.length);
    return frasesSarcasticas[indiceAleatorio];
}

function pesquisar() {
    const nome = '';
    const dataNascimento = new Date(document.getElementById('dataNascimento').value);
    console.log(dataNascimento)
    if(dataNascimento == 'Invalid Date'){
        alert("Data não preenchida!");
        return;
    }
    const signo = calcularSigno(dataNascimento);
    const pokemon = buscarPokemonPorSigno(signo);
    const fraseSarcastica = obterFraseSarcastica();
    exibirResultado(nome, signo, pokemon, fraseSarcastica);
}

function calcularSigno(data) {
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Meses em JavaScript são base 0

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return 'Áries';
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return 'Touro';
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return 'Gêmeos';
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return 'Câncer';
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return 'Leão';
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return 'Virgem';
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return 'Libra';
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return 'Escorpião';
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return 'Sagitário';
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return 'Capricórnio';
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return 'Aquário';
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return 'Peixes';
}

function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function exibirResultado(nome, signo, pokemon, fraseSarcastica) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <!--<h2>${nome}, </h2>-->
        <h2>Seu signo é ${signo}!</h2>
        <h3>O Pokémon que combina com você é ${pokemon.nome}!</h3>
        <img src="${pokemon.url_imagem}" alt="Pokémon ${pokemon.nome}" id="pokemon-signo">
        <p><strong>Atributos:</strong> ${pokemon.atributos}</p>
        <p><strong>Personalidade:</strong> ${pokemon.personalidade}</p>
        <p><strong>Comentário:</strong> ${pokemon.comentario}</p>
        <div id="links">
            <a target="_blank" href="https://www.pokemon.com/br/pokedex/${pokemon.nome.toLowerCase()}">Saber mais sobre o Pokémon</a>
            <a target="_blank" href="https://www.personare.com.br/horoscopo-do-dia/${removerAcentos(signo.toLowerCase())}">Saber mais sobre o Signo</a>
        </div>
        <br/>
        <div id="comment_sarc">
            <img id="emoji_thinking_face" src="emoji_thinking_face_1F914.svg" alt="emoji thinking face">
            <p class="font_yellow">${fraseSarcastica}</p>
        </div>
    `;
}
