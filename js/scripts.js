/*Create Pokemon Repository.
 *Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. 
 */ 
 
/* global imageElement */

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
            console.log("Added: " + pokemon.name +":"+ pokemonList.length);
        } else {
            console.log("Invalid input! Please try again.");
        }
    }
    
    function getAll(){
        return pokemonList;
    }
    
    //Add pokemon to List (li)
    function addListItem(pokemon){
        //Select Bootstrap list-group class
        let pokemonList = $(".list-group");
       
        //Create button triggered modal element
        let button = $("button");
        
        //Add attribute data-toggle and dat-target to button
        button.attr("data-toggle", "modal");
        button.attr("data-target", "#pokemonModal");
        
        //Add pokemon name to button
        button.innerText = pokemon.name;
        
        //Add Bootstrap Button Utility class to button
        button.addClass("list-group-item");
        button.addClass("list-group-item-action");
       
        //Append button to div with class list-group
        pokemonList.append(button);
        console.log("adding " + pokemon.name);
        
    }
    
    function loadList() {
        //Call showLoadingMessage to display a loading message while Pokemons are being loaded.
        //showLoadingMessage();
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
              
            });
    }
    
    return{
        addListItem,
        add,
        getAll,
        loadList
    };    
    
 })();
 
pokemonRepository.loadList().then(function(){
    //Iterate each object in pokemonRepository using forEach()
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
 