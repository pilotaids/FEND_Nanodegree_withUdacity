// Variables declaration
var menu = document.querySelector("#menu");		// Reduced screen menu icon
var main = document.querySelector("main");		// Main html element
var drawer = document.querySelector(".nav");	// Nav Bar

// Open the drawer when the menu icon is clicked
menu.addEventListener("click", function(e) {
  drawer.classList.toggle("open");
  e.stopPropagation();
});
// Close the drawer when the user clicks outside of the drawer / in the 'main'
main.addEventListener("click", function() {
  drawer.classList.remove("open");
});
