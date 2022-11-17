
/* List Pokémon and information about them.
 First, set pokemonList array to blank array. This array contains Pokémon data to display in the application.*/
let pokemonList = []; 

/* Adding several pokemon character objects to pokemonList. 
Each object has name as String, height as number in millimeter and type which is an array of Strings.*/

pokemonList = [
    {name : "Bulbasaur", height : 0.7 , types :["grass","poison"]},
    {name : "Charmander", height : 0.6 , types :['fire']},
    {name : "Beedrill", height : 1.0, types : ['bug', 'poison']},
    {name : "Pikachu", height : 0.4, types : ['electric']},
    {name : "Jigglypuff", height : 0.5 , types : ['fairy', 'normal']}
];

/*Iliterate each pokemon character in the list using for loop. Write each name and height, for example
Bulbasaur (height: 7)*/
for (let i=0; i < pokemonList.length; i++){
    //Highlight Pokemon only if its height at least 1.0 by adding Wow, that's big.  
    if (pokemonList[i].height >= 1.0){
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")");
        document.write("<span class= \"highlight\">Wow, that's big!</span><br>");
    } else {
        document.write (pokemonList[i].name  + " (height: " + pokemonList[i].height +")"); 
        document.write("<br>");
    }
    
     
}
