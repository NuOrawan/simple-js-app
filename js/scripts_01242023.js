/*Create Pokemon Repository.
 *Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. 
 */ 
 
/* global imageElement */

let pokemonRepository = (function(){
    //First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.
    let pokemonList = []; 
    //Create variable for API url and get 20 pokemons
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100";
    //Declare modal container
    let modalContainer = document.querySelector("#modal-container");
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
        
        //Call addBtnEvent to create eventhandler for each newly created button
       // addBtnEvent(button,pokemon);
    }
    //Show loading message in div while Pokemon is loading
   // function showLoadingMessage(){
     //   document.querySelector(".loader").style.display = "block";
    //}    
    //Hide loading message in div when page is done loading
    //function hideLoadingMessage(){
      //  document.querySelector(".loader").style.display = "none";
        //Showing loading is finish in console
        //console.log("Loading finish!");
    //}
    //A promise function to load pokemons from external pokemon API
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
              //Call hideLoadingMessage to hide loading message.
            //  hideLoadingMessage();
           // }).catch(function (e) {
                //Display error message in console
            //  console.error(e);
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
        let typesElement = $("<p>" + "Type:" +showTypes(item)+ "</p>");
        
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        
    }
      
    /*When Esc is pressed, call hideModal. Declare modal container is visible first*/
    window.addEventListener("keydown",(e) => {
    let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")){
            hideModal(); 
            }
        });
        
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
       // showLoadingMessage,
        loadList,
        add,
        getAll,
        findByName,
        loadDetails,
        showDetails,
        showModal
    };
    
 })();
 
pokemonRepository.loadList().then(function(){
    //Iliterate each object in pokemonRepository using forEach()
     pokemonRepository.getAll().forEach(function(pokemon) {
         pokemonRepository.addListItem(pokemon);
    });
});
 