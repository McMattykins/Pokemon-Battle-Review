/* 
1. Assign elements to variables -Partically complete.
2. Randomizer for correct answer - Complete
3. Reset function - Complete
4. Game loop

Strech goals:
1. Teams with turn tracking
2. In game point counter for teams
3. Add Scoreboard to closing screen.
4. Randomizer for enemy pokemon and if shiny
*/

/*
############################
###IMPORTANT - READ FIRST###
############################

Keeping track of each aspect of buttons, images, divs, and pokemon is getting out of hand. 
Although the program is working as intended, for the sake of reability and simplicity,
I should create a Pokemon object to group each component that is related to each Pokemon
in the future.

############################
##########FINISHED##########
############################
*/

///Could use this format in the future.
/*const pokemon = {
	buttons: {
		fire: document.getElementById("fire-attack-btn"),
		grass: document.getElementById("water-attack-btn"),
		water: document.getElementById("grass-attack-btn")
	},
	images: {
		fire: document.getElementById("fire-pkmn"),
		grass: document.getElementById("grass-pkmn"),
		water: document.getElementById("water-pkmn"),
		enemy: document.getElementById("enemy-pkmn")
	}
};
*/

//Variable initailization
const endGameBtn = document.getElementById("end-game-btn");
const fireBtn = document.getElementById("fire-attack-btn");
const grassBtn = document.getElementById("grass-attack-btn");
const waterBtn = document.getElementById("water-attack-btn");
const resetBtn = document.getElementById("reset-btn");
const attackArr = ["fire-attack-btn", "grass-attack-btn", "water-attack-btn"];

const enemyPkmn = document.getElementById("enemy-pkmn");
const enemies = [
  { image: "lucario", name: "Lucario" },
  { image: "pikachu", name: "Pikachu" },
  { image: "rayquaza", name: "Rayquaza" },
  { image: "wailord", name: "Wailord" },
];

let readyPkmn = []; //Keeps track of which pokemon can still attack.
//let winner = 0; //Track the winning team ###Currently no purpose###

resetGame(); //Set up the game.

// Used to select a random Pokemon from the array of active pokemon.
function randomPkmn() {
  randomNumber = Math.floor(Math.random() * readyPkmn.length);
  return readyPkmn[randomNumber];
}

console.log("JS Loaded"); //Confirm JS has loaded properly

//Ends the game and goes to closing screen
function endGame() {
  console.log("The game was ended");
}

//Triggers the correct pokemon and detrimines if the attack was succcessful or not.
function pkmnBtn(e) {
  const pkmn = document.getElementById(e.target.id);
  if (!pkmn.classList.contains("btn-inactive")) {
    console.log(`${e.target.id} was pressed.`);
    console.log("Before Splice: " + readyPkmn);
    pkmnAttack(e.target);
    if (randomPkmn() === e.target.id) {
      console.log(`You hit the enemy with ${e.target.id}`);
      pkmnHit(enemyPkmn);
    } else {
      console.log(`You missed the enemy with ${e.target.id}`);
      pkmnHit(document.getElementById(pkmn.name));
    }
    readyPkmn.splice(readyPkmn.indexOf(e.target.id), 1);
    console.log("After Splice: " + readyPkmn);
    pkmn.classList.add("btn-inactive");
  }
}

//Resets the game for a new round.
function resetGame() {
  readyPkmn = attackArr.map((e) => e); //Maps all pokemon to the ready array.
  const btns = document.getElementsByClassName("btn");
  Array.prototype.forEach.call(btns, (elem) =>
    elem.classList.remove("btn-inactive")
  ); //Converts the HTML elements into an array and removes the 'btn-inactive' class from them
  setEnemy();
}

//Select a random enemy
function setEnemy() {
  const enemy = {
    elem: enemyPkmn.children[0],
    select: Math.floor(Math.random() * enemies.length),
    shiny: Math.random() > 0.9,
  };
  enemy.elem.classList.contains("shiny") &&
    enemy.elem.classList.remove("shiny");
  enemy.elem.src = enemy.shiny
    ? `./img/enemies/${enemies[enemy.select].image}-shiny.gif`
    : `./img/enemies/${enemies[enemy.select].image}.gif`;
  enemy.elem.alt = enemies[enemy.select].name;
  enemy.shiny && enemy.elem.classList.add("shiny");
}

/*################
####Animations####
################*/
//Pokemon attack animation
function pkmnAttack(e) {
  const pkmn = document.getElementById(e.name);
  pkmn.style.display = "block";
  setTimeout(
    () => (document.getElementById(e.name).style.display = "none"),
    4000
  );
}

//Animation for pokemon when hit.
function pkmnHit(e) {
  console.log(e);
  e.animate(
    [
      //Keyframes
      { transform: "translate(-1px, 1px) rotate(0deg)" },
      { transform: "translate(-3px, -2px) rotate(-1deg)" },
      { transform: "translate(3px, 0px) rotate(1deg)" },
      { transform: "translate(-3px, 2px) rotate(0deg)" },
      { transform: "translate(3px, -1px) rotate(1deg)" },
      { transform: "translate(-3px, 2px) rotate(-1deg)" },
      { transform: "translate(3px, 1px) rotate(0deg)" },
      { transform: "translate(-3px, 1px) rotate(-1deg)" },
      { transform: "translate(3px, -1px) rotate(1deg)" },
      { transform: "translate(-3px, 2px) rotate(0deg)" },
      { transform: "translate(-1px, -2px) rotate(-1deg)" },
    ],
    {
      //Timings
      duration: 500,
      interations: 2,
    }
  );
}

//Button listeners
endGameBtn.addEventListener("click", endGame);
fireBtn.addEventListener("click", pkmnBtn);
grassBtn.addEventListener("click", pkmnBtn);
waterBtn.addEventListener("click", pkmnBtn);
resetBtn.addEventListener("click", resetGame);
