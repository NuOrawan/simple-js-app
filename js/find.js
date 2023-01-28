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
            let container = input.parentElement; // The .input-wrapper

            //Check and remove exisiting error message
            let error = container.querySelector(".error-message");
            if (error){
                container.removeChild(error);
            }
            // Now add the error if the message isn’t empty.
            if (message){
                //Create div element with error-message class
                let error = document.createElement("div");
                error.classList.add("error-message");
                error.innerText = message;
                //Add error div to parent element ie. container
                container.appendChild(error);
            }

        }
        //Validate name. Name should not be empty.
        function validateName(){
            let value = nameInput.value;
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
                //Find a match and return object that match name
                let result = pokemonList.filter(function(pokemon){
                    return pokemon.name === name;
                }); 
                return result;
            } else {
                console.log("Please try entering pokemon name again.");
            }
        }
        function validateForm(){
            let isValidName = validateName();
            return isValidName;
        }
        
        
        //form.addEventListener("submit", (e)=> {
        //    e.preventDefault(); //Do not submit to the server
        //    if(validateForm()){
        //        alert("Success");
        //    }
        //} );
        
    $("form").submit(function(){
    //alert("Submitted");
        e.preventDefault(); //Do not submit to the server
        if(validateForm()){
        alert("Success");
        }
    });
    
    //nameInput.addEventListener("pokemonName", validateName);
    nameInput.on("pokemonName", validateName);
   
})();