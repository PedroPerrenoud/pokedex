const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1; //Usado para os botões Next e Prev

const fetchPokemon = async (pokemon) => {
//Cria-se uma variável que recebe o parâmetro pokemon

  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  //A função Fetch é usada para buscar os dados da api, e a resposta do servidor será armazenada na variável response.

  //Aqui foi criado uma resposta para a API.

  //Com o Comando Fetch() ele busca fazer conexão com a API

  //Precisamos do await para que ele primeiro faça a requisição para o site, e então nos retorne um valor. 
  
  //Como o await só funciona em funções assincronas, precisamos definir fetchPokemon() como async

if (APIresponse.status == 200){
  //Se a resposta for igual ao status de sucesso(200), vai executar as linhas abaixo:
  const data = await APIresponse.json();
  return data;
}



// Aqui ele criou uma constante data que pega os dados que a APIresponse requisitou ao site e transforma eles em um JSON para ser possível a leitura do programa. 
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Searching...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon);

  if(data){ //Se os dados forem encontrados, o código segue e o pokemon com seu nome e id é renderizado
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value='' //Define o prompt como vazio após a pesquisa
    searchPokemon = data.id
  } else { //Se nenhum dado for encontrado, retorna as mensagens abaixo
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :c'
    pokemonNumber.innerHTML = ''

  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase()); //toLower para impedir erros com letras maiúsculas ou minúsculas.
}) 
//Esse evento permite pegar o valor do input e renderizar ele em uma pesquisa na API

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1){
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
}) 

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
}) 

//Em casos de erros por buscas erradas, precisamos lidar com o pokemonName.innerHTML = data.name

//Este nos retorna os dados que ele encontrou da pesquisa feita no prompt, e caso o prompt entregue um valor inexistente em seu banco de dados, o data retorna como undefined.

renderPokemon(searchPokemon) //Ao entrar, sempre renderiza o primeiro Pokemon.