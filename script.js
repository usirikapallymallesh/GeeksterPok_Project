console.log("connection");

const typeURL = "https://pokeapi.co/api/v2/type/";

/***********************************************************
 list of pokemon total
***********************************************************/
let nameUrlMap = {};

async function searchListOfPokemon() {
  let response = await fetch(typeURL);
  let parsedResponse = await response.json();
  let optionsArray = parsedResponse.results;
  const select = document.querySelector("#pokemon-types");
  // console.log(optionsArray);
  for (let i = 0; i < optionsArray.length; i++) {
    const element = optionsArray[i];
    //create multiple options .
    let option = document.createElement("option");
    // console.log(element);
    nameUrlMap[element.name] = element.url;
    option.innerText = element.name;
    select.append(option);
    // console.log(nameUrlMap);
  }
}
window.onload = searchListOfPokemon();
/***********************************************************/

/************************************************************
 searching the selected pokemon in list
************************************************************/

async function fetchPokemonType() {
  const selectedValue = document.getElementById("pokemon-types").value;
  const response = await fetch(nameUrlMap[selectedValue]);
  const parsedData = await response.json();
  const pokemonData = parsedData.pokemon;
  const pokemonListLength = pokemonData.length > 10 ? 10 : pokemonData.length;
  const pokemonBox = document.querySelector("#pokemon-list");
  pokemonBox.innerHTML = "";
  for (let i = 0; i < pokemonListLength; i++) {
    const element = pokemonData[i];
    let pokemon = element.pokemon;
    const pokemonName = pokemon.name;
    const pokemonUrl = pokemon.url;
    // console.log(pokemon);
    // let div=document.createElement("div");

    // let

    let imageSrcData = "";
    const imageSrc = await fetchPokemonData(pokemonUrl);
    let div = document.createElement("div");

    const pokemonFrontPicture = document.createElement("img");
    const pokemonNameSpan = document.createElement("span");

    pokemonFrontPicture.setAttribute("src", imageSrc);

    pokemonNameSpan.innerText = pokemonName;
    div.append(pokemonFrontPicture, pokemonNameSpan);

    pokemonBox.append(div);

    let imagesInList = fetchPokemonData(pokemonUrl);
  }
}
// fetchPokemonType();

async function fetchPokemonData(pokemonUrl) {
  let response = await fetch(pokemonUrl);
  let parsedResponse = await response.json();
  return parsedResponse.sprites.front_default;
}

/*************************************************************
   async search functionality of pokemon
*************************************************************/
async function searchFunctionality() {
  let pokemonName = document.querySelector("#search").value;
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  let parsedData = await response.json();
}
/************************************************************/
