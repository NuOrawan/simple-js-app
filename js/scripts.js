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
    //Loader
    //let loaderElement = $(".loader");
    let loaderElement = document.querySelector(".loader");
    
    
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
        let pokemonListElement = $(".pokemon-list");
        
        //Create button triggered modal element
        let button = $("<button class='pokemon-button btn btn-info float-md-left float-lg-left' data-target='#pokemonModal' data-target='modal'>" + pokemon.name +"</button>");
       
        //Append button to div with class pokemon-list
        pokemonListElement.append(button);
        
        //Add event listner to show Pokemon details when clicked
        button.on('click', function(){
            showDetails(pokemon);
        });
    }
    
    //Show loading message in div while Pokemon is loading
    function showLoadingMessage(){
      // document.querySelector(".loader").style.display = "block";
        loaderElement.classList.add("loader");
    }  
    
    //Hide loading message in div when page is done loading
    function hideLoadingMessage(){
       // document.querySelector(".loader").style.display = "none";
         loaderElement.classList.add("loader-hidden");
        
    }
    
    function loadList() {
        //Display loading message while Pokemons are being loaded.
        showLoadingMessage();
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
            //Hide loading message once all Pokemon is done loading.
            hideLoadingMessage();
            }).catch(function (e) {
                //Display error message in console
                console.error(e);  
              
            });
    }
    
    //Load details of each pokemon from external API
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
    
    //Show details of Pokemon in modal.
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
       
        //Clear existing title and body in modal
        modalTitle.empty();
        modalBody.empty();
       
        //Create name element for modal content
        let nameElement = $("<h3>" + item.name +"</h3>");
        
        //Create image element for Pokemon in modal content section
        let imageElement = $("<img>");
        imageElement.addClass(".modal-img");
        //Append imageElement with it's attributes
        imageElement.attr("src", item.imageUrl);
        imageElement.attr("width", "50%");
        imageElement.attr("height", "50%");
        //Create height element
        let heightElement = $("<p class='h6'>" +"Height: "+ item.height +"</p>");
        //Create types element
        let typesElement = $("<p class='h6'>" + "Type: " + showTypes(item) + "</p>");
        
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        
        let pokemonModal = $("#pokemonModal");
        pokemonModal.modal('show');
        
    }
    
    
    return{
        addListItem,
        add,
        getAll,
        showLoadingMessage,
        hideLoadingMessage,
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
 
//Form Validation
(function(){
    let form = $("#findPokemon-form");
    let nameInput = $("#pokemonName");
    //Show error message if input is empty
    function showErrorMessage(input,message){
        let messageContainer = input.parent(); // ie. .input-wrapper
        //Check and remove exisiting error message
        let error = messageContainer.find(".error-message");
        if (error){
            console.log("Existing error.");
            $('.error-message').remove();
        }
        // Now add the error if the message isn’t empty.
        if (message){
            //Create div element with error-message class
            let error = $("<div class=' break error-message'></div>");
            error.text(message);
            //Add error div to parent element ie. messageContainer
            messageContainer.append(error);
        }
    }
    //Validate name. Name should not be empty.
    function validateName(){
        let value = nameInput.val();
        if (!value){
            showErrorMessage(nameInput, "Name is required.");
            return false;
        }
        showErrorMessage(nameInput,null);
        return true;  
    }
    /*Search pokemon in the array by name
    function findByName(name){
        //Check if name is String and not empty
        if(typeof name === 'string' && name.length > 0){
            //Create variable for API url and get Pokemon by name
            let apiUrl = "https://pokeapi.co/api/v2/pokemon/" + name;
            
            //Find a match by name and return its details ie. image, height and type
            return fetch(apiUrl).then(function (response) {
               // console.log("Response :" + response.json());
                return response.json();
            }).then(function (pokemon) {
                //Remove result if there is any
                let divElement = $(".result");
                divElement.empty();
                //Create name element for modal content
                let nameElement = $("<h3>" + pokemon.name +"</h3>");
                //Create image element for Pokemon in result section
                let imageUrl = pokemon.sprites.front_default;   

                let imageElement = $("<img>");
                imageElement.addClass(".pokemon-img");
                //Append imageElement with it's attributes
                imageElement.attr("src", imageUrl);
                imageElement.attr("width", "50%");
                imageElement.attr("height", "50%");
                //Create height element
                let heightElement = $("<p class='h6'>" +"Height: "+ pokemon.height +"</p>");
                //Create types element
                let typesElement = $("<p class='h6'>" +"Types: "+ showTypes(pokemon) +"</p>");

                divElement.append(nameElement);
                divElement.append(imageElement);
                divElement.append(heightElement);
                divElement.append(typesElement);

                }).catch(function (e) {
                    showErrorMessage(nameInput, "Sorry! We can't find this pokemon.");
                });
        } else {
            console.log("Sorry. It does not exist. Please try entering pokemon name again.");
        }
    }
    */
    /*Show types of each Pokemon
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
    }*/
        function validateForm(){
            let isValidName = validateName();
            if (isValidName){
                //Convert input value to all lowercase
                findByName(nameInput.val().toLowerCase());
            }
        }
    $("form").submit(function(e){
        e.preventDefault(); //Do not submit to the server
        if(validateForm()){
            alert("Success");
            findByName(nameInput);
        }
    });
    nameInput.on("input", validateName);
})();