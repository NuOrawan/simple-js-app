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
        let pokemonListElement = $(".pokemon-list");
        
        let listItem = $("<li class='list-group-item'></li>");
       
        //Create button triggered modal element
        let button = $('<button class="pokemon-button btn btn-info" data-target="#pokemonModal" data-target="modal">' + pokemon.name +"</button>");
        
        listItem.append(button);
        
       
        //Append button to div with class pokemon-list
        pokemonListElement.append(listItem);
        
        //Add event listner to show Pokemon details when clicked
        button.on('click', function(){
            showDetails(pokemon);
        });
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
            }
        );
    }
    
    function showDetails(item){
        pokemonRepository.loadDetails(item).then(function(){
            showModal(item);
        });
    }
    
    //Show types of each Pokemon
    function showTypes(pokemon){
        let types = "";
        //Loop through types which is an object from pokeapi.co containing name(s) of type(s) 
        pokemon.types.forEach(function(obj){
            type = obj["type"];
            name = type["name"];
            //Add space between each type name and make them as one string
            types = types + name + " ";
        });
        
        return types;
    }
    
    //Hide modal
    function hideModal(){
        modalContainer.classList.remove("is-visible");
    }
    
    //Show a modal with the Pokémon’s name, its height, and an image of the Pokémon. 
    function showModal(item){
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        //Clear existing title and body in modal
        modalTitle.empty();
        modalBody.empty();
        //Create name element for modal content
        let nameElement = $("<h1>" + item.name +"</h1>");
        //Create image element for Pokemon in modal content section
        
        let imageElement = $("<img>");
        imageElement.addClass(".modal-img");
        //Append imageElement with it's attributes
        imageElement.attr("src", item.imageUrl);
        imageElement.attr("width", "50%");
        imageElement.attr("height", "50%");
        //Create height element
        let heightElement = $("<p>" +"Height:"+ item.height +"</p>");
        //Create types element
        let typesElement = $("<p>" + "Type:" + showTypes(item) + "</p>");
        
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        
        let pokemonModal = $("#pokemonModal");
        pokemonModal.modal('show');
      
        
    }
      
    /*When Esc is pressed, call hideModal. Declare modal container is visible first*/
    window.addEventListener("keydown",(e) => {
    let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")){
            hideModal(); 
            }
        });
    
    return{
        addListItem,
        add,
        getAll,
        loadList,
        loadDetails,
        showDetails,
        hideModal,
        showModal
    };    
    
 })();
 
pokemonRepository.loadList().then(function(){
    //Iterate each object in pokemonRepository using forEach()
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
 