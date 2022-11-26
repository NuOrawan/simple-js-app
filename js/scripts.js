/*Create Pokemon Repository.
 *Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. 
 */ 
 
let pokemonRepository = (function(){
    //First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.
    let pokemonList = []; 
    //Pokemon array that has name, height and types
    pokemonList = [
        {name : "Bulbasaur", height : 0.7 , types :["grass","poison"]},
        {name : "Charmander", height : 0.6 , types :["fire"]},
        {name : "Beedrill", height : 1.0, types : ["bug", "poison"]},
        {name : "Pikachu", height : 0.4, types : ["electric"]},
        {name : "Jigglypuff", height : 0.5 , types : ["fairy", "normal"]}
    ];
    //Add Pokemon objects to the array
    function add(pokemon){
        //Check if parameter is type of Object and not null
        if (typeof pokemon === 'object' && pokemon !== null){
            pokemonList.push(pokemon);
        } else {
            console.log("Invalid input! Please try again.");
        }
    }
    function getAll(){
        return pokemonList;
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
    
    return{
        add,
        getAll,
        findByName
    };
    
 })();
 //Add new pokemon object
 pokemonRepository.add({ name: "Ivysaur", height: 1, types :["grass", "poison"]});
 
 console.log(pokemonRepository.getAll());
 
//Search Pokemon by name for example Pikachu
 console.log(pokemonRepository.findByName("Pikachu"));

//Iliterate each object in pokemonRepository using forEach()
 pokemonRepository.getAll().forEach(function(list) {
  document.write("<b>"+list.name + "</b><br>");  
  document.write("Height : " + list.height + ". Type : " + list.types + "<br>");
});


/* List Pokémon and information about them.
 First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.
let pokemonList = []; 
*/
/* Adding several pokemon character objects to pokemonList. 
Each object has name as String, height as number in millimeter and type which is an array of Strings

pokemonList = [
    {name : "Bulbasaur", height : 0.7 , types :["grass","poison"]},
    {name : "Charmander", height : 0.6 , types :["fire"]},
    {name : "Beedrill", height : 1.0, types : ["bug", "poison"]},
    {name : "Pikachu", height : 0.4, types : ["electric"]},
    {name : "Jigglypuff", height : 0.5 , types : ["fairy", "normal"]}
];
*/
/*Iliterate each pokemon character in the list using for loop. Write each name and height, for example
Bulbasaur (height: 7)
for (let i=0; i < pokemonList.length; i++){
    //Highlight Pokemon only if its height at least 1.0 by adding Wow, that's big.  
    if (pokemonList[i].height >= 1.0){
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")");
        document.write("<span class= \"highlight\">Wow, that's big!</span><br>");
    } else {
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")"); 
        document.write("<br>");
    }
    
     
}*/
/*Iliterate each pokemon character using forEach()
pokemonList.forEach(function(list) {
  document.write("<b>"+list.name + "</b><br>");  
  document.write("Height : " + list.height + ". Type : " + list.types + "<br>");
});*/
