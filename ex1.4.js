
//Check if either variables is NaN. If one of the variable is NaN, show message that inputs should be numerical value.
function isNotNaN(number1, number2) {
  let result = 0;
  if (isNaN(number1) || isNaN(number2)) {
    document.write("Two numerical value required. Please refresh screen           and try again.");
  }
  else {
    result = true;
    return result;
  }
}
// Add two numbers function
function add(number1, number2){
  if (isNotNaN(number1,number2)){
    let sum = number1 + number2;
    return sum;
  }
}
// Subtract two numbers function
function subtract(number1, number2){
  if (isNotNaN(number1,number2)){
    let sum = number1 - number2;
    return sum;
  }
}
//Multiply two numbers function
function multiply(number1, number2){
  if(isNotNaN(number1,number2)){
    let sum = number1 * number2;
    return sum;
  }
}
//Divide the first number by the second number and return the quotient; however, if the divisor is equal to zero, the function should return the text “Not Allowed”
function divide(number1,number2){
  if(isNotNaN(number1,number2)){
    if(number2 == 0){
      return "0 is not allowed.";
    } else {
      let sum = number1 / number2;
      //returning result in quotient
      return Math.trunc(sum);
    }
  }
}

