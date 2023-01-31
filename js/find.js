/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    let form = $("#findPokemon-form");
    let nameInput = $("#pokemonName");
    //Show error message if input is empty
    function showErrorMessage(input,message){
        let messageContainer = input.parent(); // ie. .input-wrapper
        //Check and remove exisiting error message
        let error = messageContainer.find(".error-message");
        if (error){
            $('.error-message').remove();
        }
        // Now add the error if the message isn’t empty.
        if (message){
            //Create div element with error-message class
            let error = $("<div class='error-message'></div>");
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
    //Search pokemon in the array by name
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
        function validateForm(){
            let isValidName = validateName();
            if (isValidName){
                findByName(nameInput.val());
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