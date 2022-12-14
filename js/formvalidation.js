/* 
 * Validate form that has username, password and email.
 */
(function(){
    let form = document.querySelector("#login-form");
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");
    let emailInput = document.querySelector("#email");
        //Show error message
        function showErrorMessage(input, message){
            let container = input.parentElement; // The .input-wrapper
            //Check and remove any existing error.
            let error = container.querySelector(".error-message");
            if (error){
                container.removeChild(error);
            }
            //Add the error if error message isn't empty.
            if (message){
                let error = document.createElement("div");
                error.classList.add("error-message");
                error.innerText = message;
                container.appendChild(error);
            }
        }
        //Check if username is empty or not. Username should not be empty.
        function validateUserName(){
            let value = usernameInput.value;
            //If username string is empty, show error message.
            if (value.length === 0){
                showErrorMessage(usernameInput, "Username is required.");
                return false;
            }
            //If there is no error, return true.
            showErrorMessage(usernameInput,null);
            return true;
        }
        //Check if password has more than 8 charactors or not.
        function validatePassword(){
            let value = passwordInput.value;
            //If password string is empty, show error message.
            if (!value){ // if value is NOT true
                showErrorMessage(passwordInput, "Password is required.");
                return false;
            }
            //If password string length is less than 8, show error message.
            if (value.length < 8){
                showErrorMessage(passwordInput, "The password needs to be at least 8 characters long.");
                return false;
            }
            //If there is no error, return true.
            showErrorMessage(passwordInput,null);
            return true;
        }
        //Check if email contains both "@" and ".".
        function validateEmail(){
            let value = emailInput.value;
            //If email is empty, show error message that email is required.
            if (!value){
                showErrorMessage(emailInput,"Email is required.");
                return false;
            }
            //If email doesn't contain @ , show error message.
            if (value.indexOf("@") === -1){
                showErrorMessage(emailInput, "You must enter a valid email address.");
                return false;
            }
            //If email doesn't contain . , show error message.
            if (value.indexOf(".") === -1){
                showErrorMessage(emailInput, "You must enter a valid email address.");
                return false;
            }
            //If there is no error, return true.
            showErrorMessage(emailInput,null);
            return true;
        }
        
        function validateForm(){
            let isValidUsername = validateUserName();
            let isValidEmail = validateEmail();
            let isValidPassword = validatePassword();
            return isValidUserName() && isValidEmail() && isValidPassword();
        }
        //Add eventlistener to submit button
        form.addEventListener('submit', (e) => {
        e.preventDefault(); // Do not submit to the server
            if (validateForm()) {
                alert('Success!');
            }
        });
        //Add eventlistener to input field to show error message as user type in input field.
        usernameInput.addEventListener("input", validateUserName);
        emailInput.addEventListener("input", validateEmail);
        passwordInput.addEventListener("input", validatePassword);
    }
)();

