/* 
 * Initial variables declaration
 */
let links = [
				"https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
				"https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
				"https://top13.net/wp-content/uploads/2016/09/cutest-kittens-ever-9.jpg",
				"http://openwalls.com/image/22198/cute_kitten_8_1920x1080.jpg",
				"http://www.laughspark.info/thumbfiles/705x705//1-cute-kitten-playing-with-fun-635726822891482499-2195.png",
				"http://www.lovethispic.com/uploaded_images/26677-Cute-Kitten.jpg"
			];
let catsListSection = document.getElementsByClassName('cats-list');
let catsShowSection = document.getElementsByClassName('show-cat');
// Call the 'add-Cats' functions to populate the page
addCatsDiv();
addCatsList();



/* 
 * Variables declaration & initialization after all elements have been added
 */
// Cats' list vars
let catItems = document.getElementsByClassName('cats-items');
// Cats' divs vars
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
function addCatsDiv() {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < links.length; i++) {
		
		// Create new 'div' element
	    const newElement = document.createElement('div');

		// Set initial attributes and content for the new 'li'
	    newElement.className = 'cats do-not-show';
//	    newElement.classList.add('do-not-show');
	    newElement.id = `cat${(i+1)}`;
	    newElement.innerHTML = `<h2 class="cats-name"></h2>
					<img class="cats-img" src="${links[i]}">
					<p class="counters"></p>`;



	    // Appent new 'li' to the document fragment
	    fragment.appendChild(newElement);
	}

	// Appent the document fragment to the deck-ul, reflow, and repaint
	catsShowSection[0].appendChild(fragment);
}

// Add the cats to the page
function addCatsList() {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < links.length; i++) {

		// Create new 'div' element
	    const newElement = document.createElement('li');

		// Set initial attributes and content for the new 'li'
	    newElement.className = 'cats-items';
	    newElement.id = `cat-item${(i+1)}`;
	    newElement.innerHTML = `<a href="#cats[${i}]">
	    							Kitten number ${(i+1)}
	    						</a>`;


	    // Appent new 'li' to the document fragment
	    fragment.appendChild(newElement);
	}

	// Appent the document fragment to the deck-ul, reflow, and repaint
	catsListSection[0].firstElementChild.appendChild(fragment);
}

// Ensure all cats' divs are invisible and show only the one selected
function showRelatedImg(catId){
	const catDiv = document.getElementById('cat'+catId[catId.length-1]);

	// Make all divs invisible
	for (let i = 0; i < cats.length; i++) {
		if (!cats[i].classList.contains('do-not-show')){
			cats[i].classList.add('do-not-show');
		}
	}

	// Only show the one selected
	catDiv.classList.remove('do-not-show');
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

// Check the selected item is the li
function checkSelectedLi(evt) {
	// Verify the user has click on a desired target
	if (evt.target.nodeName === 'A')
		showRelatedImg(evt.target.parentElement.id);
}

// Check the selected item is the image
function checkSelectedImg(evt) {
	// Verify the user has click on a desired target
	if (evt.target.nodeName === 'IMG')
		incrementCounter(evt.target.parentElement.id);
}


/* 
 * Event listeners
 */
catsShowSection[0].addEventListener('click', checkSelectedImg);
catsListSection[0].addEventListener('click', checkSelectedLi);
