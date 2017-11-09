var game = {};

//two variables
game.colors = [];
game.pickedColor = undefined;

//the document elements
game.squares = document.querySelectorAll(".square");
game.colorDisplay = document.getElementById("colorDisplay");
game.messageDisplay = document.querySelector("#message");
game.h1 = document.querySelector("h1");
game.resetButton = document.querySelector("#reset");
game.modeBtn = document.querySelectorAll(".mode");

//game object methods
//init a new game
game.init = function() {
	//add event listeners
	this.setupModeButtons();
	this.setupSquares();
	this.setupReset();
	this.newGame(6);
}

//select game mode
game.setupModeButtons = function(){
	for (var i = 0; i < this.modeBtn.length; i++) {
		this.modeBtn[i].addEventListener("click", function(){
			//remove buttons background
			game.modeBtn[0].classList.remove("selected");
			game.modeBtn[1].classList.remove("selected");
			//add background to selected buttons
			this.classList.add("selected");
			//reset game
			this.textContent === "Easy" ? game.newGame(3) : game.newGame(6);
		});
	}
}

//set up squares
game.setupSquares = function(){
	for (var i = 0; i < this.squares.length; i++) {
		//add click listeners to squares
		this.squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;

			//compare color to pickedColor
			if (clickedColor === game.pickedColor) {
				game.messageDisplay.textContent = "Correct!";
				game.changeColors(clickedColor);
				game.h1.style.background = clickedColor;
				game.resetButton.textContent = "Play Again?"
			} else {
				this.style.background = "#232323"
				game.messageDisplay.textContent = "Try Again";
			}
		});
	}
}

//set up reset
game.setupReset = function() {
	//Reset a new game
	this.resetButton.addEventListener("click", function(){
		game.newGame(game.colors.length);
	});
}


game.newGame = function(num){
	//remove the messageDisplay
	this.messageDisplay.textContent = "";
	//reset the New Color Button
	this.resetButton.textContent = "New Colors";
	//generate all new colors
	this.colors = this.generateRandomColors(num);
	//pick a new random color from array
	this.pickedColor = this.pickColor();
	//change corlorDisplay to match picked color
	this.colorDisplay.textContent = this.pickedColor;
	//change colors of squares
	for(var i = 0; i < this.squares.length; i++) {
		if (this.colors[i]) {
			this.squares[i].style.display = "block";
			this.squares[i].style.background = this.colors[i];
		} else {
			this.squares[i].style.display = "none";
		}
	}
	//change h1 background
	this.h1.style.background = "steelblue";
}




//New Game
game.changeColors = function(color) {
	//loop through all squares
	for (var i = 0; i < this.squares.length; i++) {
		//change color of each square to match given color 
		this.squares[i].style.background = color;
	}
}

game.pickColor = function() {
	var random = Math.floor(Math.random() * this.colors.length);
	return this.colors[random];
}

game.generateRandomColors = function(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		//random color, push it in array
		arr.push(this.randomColor());
	}
	//return that array
	return arr;
}

game.randomColor = function() {
	//pick a red from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick a green
	var green = Math.floor(Math.random() * 256);
	//pick a blue
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}


//main program
game.init();