/*
 * Variables declaration
 */
// 'Time-values' constants userd for calculations
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
// HTML & CSS Selectors
const finalMoves = document.getElementById("num-moves");
const finalStars = document.getElementById("num-stars");
const cardsDeck = document.querySelector(".deck");
const winnerDiv = document.querySelector(".winner");
const finalTime = document.querySelector(".time-values");
const runTime = document.querySelector(".current-time");
const moves = document.querySelector(".moves");
const stars = document.querySelectorAll('.fa-star');
// Non-Constant variables
let runningTimer = 0;		// Initialize running timer
let movesCounter = 0;		// moves counter
let secondPick = null;		// Initialize the 1st 'currently selected card'
let firstPick = null;		// Initialize the 2nd 'currently selected card'
let startTime = 0;			// Initialize start time value
let stopTime = 0;			// Initialize stop time value
// Cards' array with all 8 possible values
let cards = ["gem", "paper-plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

// Double the array to create the pairs
cards = cards.concat(cards);


/*
 * Functions definition
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Add the shuffled card to the deck
function addCards(array) {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < array.length; i++) {
		// Create new 'li' element
	    const newElement = document.createElement('li');

		// Set initial attributes and content for the new 'li'
	    newElement.className = 'card';
	    newElement.id = `card-num${(i+1)}`;
	    newElement.innerHTML = `<i class="fas fa-${array[i]}"></i></li>`;

	    // Appent new 'li' to the document fragment
	    fragment.appendChild(newElement);
	}

	// Appent the document fragment to the deck-ul, reflow, and repaint
	cardsDeck.appendChild(fragment);
}

// Show card as 'matched'
function goodMatch(card) {
	card.classList.add('match');
	card.classList.remove('open', 'show');
}

// Show card as 'failed match'
function wrongMatch(card) {
	card.classList.add('wrong');
	card.classList.remove('open');
	setTimeout(function keepWrongForTime(){
        card.classList.remove('show', 'wrong');
	}, 500);
}

// Adjust the moves on the page based on the movesCounter value
function incrementMoves() {
	movesCounter++;
	moves.textContent = movesCounter;
	rateStars(movesCounter);
}

// Compare the 2 momentarely selected cards
function compareCards(first, second) {
	if (first.firstElementChild.className === second.firstElementChild.className) {
		goodMatch(first);
        goodMatch(second);
        checkWinner();
	} else {
		setTimeout(function keepWrongForTime(){
			wrongMatch(first);
        	wrongMatch(second);
		}, 300);
	}

	// Adjust move's counter
	incrementMoves();
}

// Check if the selected class does NOT have 'match' as one of its classes
function noMatchClass(card) {
	let classes = card.classList;
	let noMatch = true;

	classes.forEach(function(value) {
		if ((value === "match"))
			noMatch = false;
	});

	return noMatch;
}

// Adjust the star rating as needed based on the number of moves
function rateStars(moves) {
	if ((moves > 10) && (moves < 18))
		stars[2].className = "far fa-star";
	else if ((moves > 17) && (moves < 26))
		stars[1].className = "far fa-star";
	else if (moves > 25)
		stars[0].className = "far fa-star";
}

// Show/Hide card & handle the 'currently selected cards'
function flipCard(card) {
    // Act on card only if not already matched
	if (noMatchClass(card)
		&& ((firstPick === null) || (secondPick === null))) {
        card.classList.add('open');
	    card.classList.add('show');

	    // Keep track of the 'currently selectedly cards' pair
	    if (firstPick === null) {
	    	firstPick = card;
	    } else if (card.id !== firstPick.id) {
	    	secondPick = card;
	    	compareCards(firstPick, secondPick);
	    	// Reset the 'currently selectedly cards' vars
	    	firstPick = null;
	    	secondPick = null;
	    }
 	}
}

// Populate the 'timer-values' field in the winnerDiv
function timePlayed(timeField, timeText) {
	let timeUnits = "mm:ss";

	// Record completion time
	stopTime = Date.now();

	// Calculate the time elapsed
	const timeElapsed = stopTime - startTime;
	// Calculate and truncate time values (add padding as needed)
	const hours   = (((timeElapsed / hour) !== 0)
						&& ((timeElapsed / hour) < 24 )) ?
						Math.floor((timeElapsed / hour)) : 0;
	const minutes = ((((timeElapsed % hour) / minute) !== 0)
						&& (((timeElapsed % hour) / minute) < 60 )) ?
						Math.floor((timeElapsed % hour) / minute) : 0;
	const seconds = ((((timeElapsed % minute) / second) !== 0)
						&& (((timeElapsed % minute) / second) < 60 )) ?
						Math.floor((timeElapsed % minute) / second) : 0;

	// Only include the 'hours' when necessary
	if (hours !== 0 ){
		timeText += (digitPadding(hours) + ":");
		timeUnits = "hh:" + timeUnits;
	}

	// Modify text showing completion time in the winnerDiv
	timeField.textContent = timeText + (digitPadding(minutes))
								+ ":" + (digitPadding(seconds))
								+ " (" + timeUnits + ")";
}

// Initialize the running timer and record the start time when clicking on the first card
function startTheClock() {
	// Reset running timer
	stopTimer();
	runningTimer = setInterval(function(){
		timePlayed(runTime, "");
	}, 500);
	// Record restarting/starting time
	startTime = Date.now();
}

// Check the selected item is either the li.card or the i element within it
function checkSelectedItem(evt) {
	// Initialize the running timer and record the start time
	if ((runningTimer === 0) && (startTime === 0))
		startTheClock();

	// Verify the user has click on a desired target before acting on it
	if (evt.target.nodeName === 'LI')
		flipCard(evt.target);
	else if (evt.target.nodeName === 'I')
		flipCard(evt.target.parentElement);
}

// Add proper padding to the time-value digits
function digitPadding(num){
  return ("0" + num).slice(-2);
}

// Find the final number of stars
function countStars() {
	let count = stars.length;

	stars.forEach(function(star) {
		if (star.className !== "fas fa-star")
			count--;
	});

	return count;
}

// Populate the fields of the winnerDiv's elements
function populateWinnerDiv() {
	let starsValue = countStars();

	// Publish the final number of moves the user won with 
	finalMoves.textContent = movesCounter;

	// Publish the final number of stars the user won with
	if (starsValue === 1)
		finalStars.textContent = starsValue + " Star";
	else
		finalStars.textContent = starsValue + " Stars";

	// Calculate & publish how long it took the user to complete the game
	timePlayed(finalTime, "You completed the game in ");
}

// Check if all the cards have been matched & the user has won the game
function checkWinner() {
	const cards = document.querySelectorAll('.card');
	let userWon = true;

	// Check all the cards have the 'match' class
	for (let i = 0; i < cards.length; i++) {
		if (noMatchClass(cards[i])) {
			userWon = false;
			break;
		}
	}

	// Make the 'Winner Pop-up Window' visible when all cards have been matched
	if(userWon){
		// Stop timer
		stopTimer();
		// Display window & stop timer
		winnerDiv.classList.add('show-me');
		populateWinnerDiv();
	}
}

// Stop & clear running timer
function stopTimer() {
    clearInterval(runningTimer);
}

// Load/reload the game
function start() {
	// Stop timer (effectively used only on restarts)
	stopTimer();

	// Reset the running timer and the start time (effectively used only on restarts)
	runningTimer = 0;
	startTime = 0;
	runTime.textContent = "";

	// Clear the deck of all cards
	while (cardsDeck.hasChildNodes()) {
    	cardsDeck.removeChild(cardsDeck.firstChild);
	}

	// Reset counter and 'currently selected cards' variable
	firstPick = null;
	secondPick = null;
	movesCounter = 0;
	moves.textContent = 0;

	// Reset stars
	stars.forEach(function(star) {
		star.className = "fas fa-star";
	});

	// Hide the 'Winner Pop-up Window'
	winnerDiv.classList.remove('show-me');

	// Shuffle the cards using the provided "shuffle" method
	shuffle(cards);

	// Loop through each card, create its HTML, and add it to the page
	addCards(cards);
}



/*
 * Initialize/re-initialize the game
 */
start();
document.querySelector('.restart').addEventListener('click', start);



/*
 * Events handling (keep after 'Initialize/re-initialize the game')
 */
cardsDeck.addEventListener('click', checkSelectedItem);
