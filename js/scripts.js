/*Create Pokemon Repository.
 *Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. 
 */ 
 
let pokemonRepository = (function(){
    //First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.
    let pokemonList = []; 
    //Create variable for API url and get 20 pokemons
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
    //Add Pokemon objects to the array
    function add(pokemon){
        //Check if parameter is type of Object and not null
        if (typeof pokemon === "object" && pokemon !== null && "name" in pokemon && "detailsUrl" in pokemon){
            pokemonList.push(pokemon);
        } else {
            console.log("Invalid input! Please try again.");
        }
    }
    function getAll(){
        return pokemonList;
    }
     //Add pokemon to List (li)
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        //Create li for each pokemon
        let listPokemon = document.createElement("li");
        //Apply list style none
        listPokemon.classList.add("noneList");
        //Create button style
        let button = document.createElement("button");
        //Add pokemon name to button
        button.innerText = pokemon.name;
        //Add class to button
        button.classList.add("button");
        //Append button to li
        listPokemon.appendChild(button);
        //Append li to pokemon-list
        pokemonList.appendChild(listPokemon);
        //Call addBtnEvent to create eventhandler for each newly created button
        addBtnEvent(button,pokemon);
    }
    //A promise function to load pokemons from external pokemon API
    function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        });
    }
    //Add the event listener to the newly created button
    function addBtnEvent(button,pokemon){
        button.addEventListener("click", function () {
        //Call showDetails function when a button is clicked. 
        showDetails(pokemon);
        });
    }
    //A promise function. Load details of each pokemon from external API
    function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }
    //Show details of pokemon in console
    function showDetails(item){
        pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
        });
    }
    //Search pokemon in the array by name
    function findByName(name){
        //Check if name is String and not empty
        if(typeof name === 'string' && name.length > 0){
            //Find a match and return object that match name
            let result = pokemonList.filter(function(pokemon){
                return pokemon.name === name;
            }); 
            return result;
        } else {
            console.log("Please try entering pokemon name again.");
        }
    }
    return{
        addListItem,
        loadList,
        add,
        getAll,
        findByName,
        loadDetails,
        showDetails
    };
    
 })();
 
pokemonRepository.loadList().then(function(){
    //Iliterate each object in pokemonRepository using forEach()
     pokemonRepository.getAll().forEach(function(pokemon) {
         pokemonRepository.addListItem(pokemon);
    });
});
 //Add new pokemon object
 //pokemonRepository.add({ name: "Ivysaur", height: 1, types :["grass", "poison"]});

// console.log(pokemonRepository.getAll());
 
//Search Pokemon by name for example Pikachu
 //console.log(pokemonRepository.findByName("Pikachu"));

/* List Pokémon and information about them.
 First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.
let pokemonList = []; 
*/
/* Adding several pokemon character objects to pokemonList. 
Each object has name as String, height as number in millimeter and type which is an array of Strings

pokemonList = [
    {name : "Bulbasaur", height : 0.7 , types :["grass","poison"]},
    {name : "Charmander", height : 0.6 , types :["fire"]},
    {name : "Beedrill", height : 1.0, types : ["bug", "poison"]},
    {name : "Pikachu", height : 0.4, types : ["electric"]},
    {name : "Jigglypuff", height : 0.5 , types : ["fairy", "normal"]}
];
*/
/*Iliterate each pokemon character in the list using for loop. Write each name and height, for example
Bulbasaur (height: 7)
for (let i=0; i < pokemonList.length; i++){
    //Highlight Pokemon only if its height at least 1.0 by adding Wow, that's big.  
    if (pokemonList[i].height >= 1.0){
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")");
        document.write("<span class= \"highlight\">Wow, that's big!</span><br>");
    } else {
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")"); 
        document.write("<br>");
    }
    
     
}*/
/*Iliterate each pokemon character using forEach()
pokemonList.forEach(function(list) {
  document.write("<b>"+list.name + "</b><br>");  
  document.write("Height : " + list.height + ". Type : " + list.types + "<br>");
});*/