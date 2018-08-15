/* 
 * Initial variables declaration
 */
let links = [
				"https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
				"https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496"
			];
let catsSection = document.getElementsByClassName('all-cats');
// Call the 'addCats' function to populate the page
addCats();



/* 
 * Variables declaration & initialization after all elements have been added
 */
let cats = document.getElementsByClassName('cats');
let images = document.getElementsByClassName('cats-img');
let counters = document.getElementsByClassName('counters');
let names = document.getElementsByClassName('cats-name');
let clicks = [];
// Initialize the click-counters to 0 for all cat pictures & assign them a name
for (let i = 0; i < cats.length; i++) {
	clicks[i] = 0;
	cats[i].firstElementChild.textContent = `My name is Cat ${i+1}`;
}



/* 
 * Functions declaration
 */
 // Add the cats to the page
function addCats() {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < links.length; i++) {
		// Create new 'div' element
	    const newElement = document.createElement('div');

		// Set initial attributes and content for the new 'li'
	    newElement.className = 'cats';
	    newElement.id = `cat${(i+1)}`;
	    newElement.innerHTML = `<h2 class="cats-name"></h2>
					<img class="cats-img" src="${links[i]}">
					<p class="counters"></p>`;



	    // Appent new 'li' to the document fragment
	    fragment.appendChild(newElement);
	}

	// Appent the document fragment to the deck-ul, reflow, and repaint
	catsSection[0].appendChild(fragment);
}

// Increment the counter of the pictures that has been clicked
function incrementCounter(catId){
	for (let i = 0; i < cats.length; i++) {
		if (cats[i].id === catId){
			clicks[i]++;
			if (clicks[i] > 1)
				counters[i].textContent = `You clicked the kitten ${clicks[i]} times`;
			else
				counters[i].textContent = `You clicked the kitten ${clicks[i]} time`;
		}
	}
}

// Check the selected item is the image
function checkSelectedItem(evt) {
	// Verify the user has click on a desired target
	if (evt.target.nodeName === 'IMG')
		incrementCounter(evt.target.parentElement.id);
}


/* 
 * Event listeners
 */
catsSection[0].addEventListener('click', checkSelectedItem);
