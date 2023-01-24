/*Create Pokemon Repository.
 *Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. 
 */ 
 
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
        //Apply Bootstrap List Group class
        let pokemonList = document.querySelector(".list-group");
       
        //Create button style
        let button = document.createElement("button");
        
        //Add pokemon name to button
        button.innerText = pokemon.name;
        
        //Add Bootstrap Button Utility class to button
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
       
        //Append button to div with class list-group
        pokemonList.appendChild(button);
        
        //Call addBtnEvent to create eventhandler for each newly created button
        addBtnEvent(button,pokemon);
    }
    //Show loading message in div while Pokemon is loading
    function showLoadingMessage(){
        document.querySelector(".loader").style.display = "block";
    }    
    //Hide loading message in div when page is done loading
    function hideLoadingMessage(){
        document.querySelector(".loader").style.display = "none";
        //Showing loading is finish in console
        console.log("Loading finish!");
    }
    //A promise function to load pokemons from external pokemon API
    function loadList() {
        //Call showLoadingMessage to display a loading message while Pokemons are being loaded.
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
              //Call hideLoadingMessage to hide loading message.
              hideLoadingMessage();
            }).catch(function (e) {
                //Display error message in console
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
        
        //Clear all existing message
        modalContainer.innerText = " ";
        //Create div for modal
        let modal = document.createElement("div");
        //Add class modal to div
        modal.classList.add("modal");
        
        //Create close button in modal
        let closeButtonElement = document.createElement("button");
        //Add modal-close class to button
        closeButtonElement.classList.add("modal-close");
        //Display text on button
        closeButtonElement.innerText = "Close";
        //Add eventlistener when close button is click
        closeButtonElement.addEventListener("click", hideModal);
        
        //Create and display modal title
        let titleElement = document.createElement("h1");
        titleElement.innerText = item.name;
        
        
        
        //Create image element to show Pokemon image
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", item.imageUrl);
        imageElement.setAttribute("width", "50%");
        imageElement.setAttribute("height", "50%");
        imageElement.setAttribute("alt", "Pokemon Name");
        imageElement.classList.add("img");
        
        //Create paragraph and display modal content which contain height and types in the paragraph
        let contentElement = document.createElement("p");
        contentElement.innerText = "Height : " + item.height +" Type :" + showTypes(item);
        
        //Appendlbutton, title, linebreak, image and content to modal div
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(contentElement);
        
        //Append modal to modalContainer
        modalContainer.appendChild(modal);
        
        //Add is-visible class to modalContainer
        modalContainer.classList.add("is-visible");
        
        //When a user click anywhere else on Modal close Modal
        modalContainer.addEventListener("click", (e) =>{
            let target = e.target;
            //If that target of the click was the modal container, not modal itself,hide the modal.
            if (target === modalContainer){
                hideModal();
            }
        });
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
        showLoadingMessage,
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
 