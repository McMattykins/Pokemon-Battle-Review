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
There is a working framework at this time, but for the sake of reability and simplicity,
I should create a Pokemon object to group each component that is related to each Pokemon
before continuing any further.

############################
##########FINISHED##########
############################
*/


//Variable initailization
const endGameBtn = document.getElementById("end-game-btn")
const fireBtn = document.getElementById("fire-attack-btn")
const grassBtn = document.getElementById("grass-attack-btn")
const waterBtn = document.getElementById("water-attack-btn")
const resetBtn = document.getElementById("reset-btn")
const attackArr = ["fire-attack-btn", "grass-attack-btn", "water-attack-btn"]

const enemyPkmn = document.getElementById("enemy-pkmn")

let readyPkmn = []//Keeps track of which pokemon can still attack.
let winner = 0

resetGame() //Set up the game.

// Used to select a random Pokemon from the array of active pokemon.
function randomPkmn() {
	randomNumber = Math.floor(Math.random() * readyPkmn.length)
	return readyPkmn[randomNumber]
}

console.log("JS Loaded") //Confirm JS has loaded properly

//Ends the game and goes to closing screen
function endGame() {
	console.log("The game was ended")
}

//Triggers the correct pokemon and detrimines if the attack was succcessful or not.
function pkmnBtn(e) {
	const pkmn = document.getElementById(e.target.id)
	if(!pkmn.classList.contains("btn-inactive")) {
		console.log(`${e.target.id} was pressed.`)
		console.log("Before Splice: " + readyPkmn)
		pkmnAttack(e.target)
		if (randomPkmn() === e.target.id){
			console.log(`You hit the enemy with ${e.target.id}`)
			pkmnHit(enemyPkmn)
		}else{
			console.log(`You missed the enemy with ${e.target.id}`)
			pkmnHit(document.getElementById(pkmn.name))
		}
		readyPkmn.splice(readyPkmn.indexOf(e.target.id),1)
		console.log("After Splice: " + readyPkmn)
		pkmn.classList.add("btn-inactive")
	}
}

//Resets the game for a new round.
function resetGame(e) {
	readyPkmn = attackArr.map(e => e)//Maps all pokemon to the ready array.
	const btns = document.getElementsByClassName("btn")
	Array.prototype.forEach.call(btns, elem => elem.classList.remove("btn-inactive")) //Converts the HTML elements into an array and removes the 'btn-inactive' class from them'
}

/*################
####Animations####
################*/
//Pokemon attack animation
function pkmnAttack(e) {
	const pkmn = document.getElementById(e.name)
	pkmn.style.display = "block"
	setTimeout(() => document.getElementById(e.name).style.display = "none", 3000)
}

//Animation for pokemon when hit.
function pkmnHit(e){
	console.log(e)
	e.animate([
		//Keyframes
		{transform: "translate(-1px, 1px) rotate(0deg)" },
		{transform: "translate(-3px, -2px) rotate(-1deg)" },
		{transform: "translate(3px, 0px) rotate(1deg)" },
		{transform: "translate(-3px, 2px) rotate(0deg)" },
		{transform: "translate(3px, -1px) rotate(1deg)" },
		{transform: "translate(-3px, 2px) rotate(-1deg)" },
		{transform: "translate(3px, 1px) rotate(0deg)" },
		{transform: "translate(-3px, 1px) rotate(-1deg)" },
		{transform: "translate(3px, -1px) rotate(1deg)" },
		{transform: "translate(-3px, 2px) rotate(0deg)" },
		{transform: "translate(-1px, -2px) rotate(-1deg)" }
	],{
		//Timings
		duration: 500,
		interations: 2
	})
}

//Button listeners
endGameBtn.addEventListener("click", endGame)
fireBtn.addEventListener("click", pkmnBtn)
grassBtn.addEventListener("click", pkmnBtn)
waterBtn.addEventListener("click", pkmnBtn)
resetBtn.addEventListener("click", resetGame)