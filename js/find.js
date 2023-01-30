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
            console.log ("nameInput: "+ value);
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
                console.log("findByName:" + name);
                console.log("ApiUrl :" + apiUrl);
                //Find a match by name and return its details ie. height and type
                
        
            } else {
                console.log("Please try entering pokemon name again.");
            }
        }
        function validateForm(){
            let isValidName = validateName();
            if (isValidName){
                findByName(nameInput.val());
            }
        }
    $("form").submit(function(e){
        e.preventDefault(); //Do not submit to the server
        console.log("Name :" + nameInput);
        if(validateForm()){
            alert("Success");
            findByName(nameInput);
        }
    });
    nameInput.on("input", validateName);
   
})();