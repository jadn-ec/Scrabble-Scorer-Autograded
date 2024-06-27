// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const { run } = require("jest");
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
   console.log(letterPoints);
	return;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord = input.question("Enter a word to Score: ");

   scorerPrompt(userWord);
   //oldScrabbleScorer(userWord);
   //simpleScorer(userWord);
   //vowelBonusScorer(userWord);
};

let newPointStructure = transform(oldPointStructure); 

function simpleScorer(word) {
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints++;
   }
   return letterPoints;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      if(word[i] === 'A'|| word[i] === 'E'|| word[i] === 'I'|| word[i] === 'O'|| word[i] === 'U'){
         letterPoints = letterPoints + 3;
      } else {
         letterPoints++;
      }
   }
   return letterPoints;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
	let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {
		letterPoints += newPointStructure[word[i]];
    
	}
   return letterPoints;
};

const option0 = { 
   name:"Simple Score", 
   description:"Each letter is worth 1 point.", 
   scorerFunction: simpleScorer
};
const option1 = { 
   name:"Bonus Vowels", 
   description:"Vowels are 3 pts, consonants are 1 pt.", 
   scorerFunction: vowelBonusScorer
};
const option2 = { 
   name:"Scrabble", 
   description:"The traditional scoring algorithm.", 
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [option0, option1, option2];

function scorerPrompt(userWord) {
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple: One point per character\n");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points\n");
   console.log("2 - Scrabble: Uses scrabble point system\n");
   let userSelection = input.question("Enter 0, 1, or 2: ");
   console.log(`You chose: ${scoringAlgorithms[userSelection].name}`);
   console.log(scoringAlgorithms[userSelection].description)
   console.log(`Score for ${userWord}: ${scoringAlgorithms[userSelection].scorerFunction(userWord)}`);
}

function transform(allStructures) {
   let newPointStructure =  {}
   for (let key in allStructures) {
    for ( let i = 0 ; i < allStructures[key].length ; i++) {
      let placeHolder = allStructures[key][i];
      placeHolder = placeHolder.toLowerCase();
      newPointStructure[placeHolder] =  (Number(key));  
    }
   } 
   return newPointStructure;
}
function runProgram() {
   initialPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
