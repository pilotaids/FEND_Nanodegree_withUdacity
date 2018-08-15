'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
	// Injecting a service into a controller
	// To inject something into a controller we need to pass an array of things to
	// inject:
	// - add an array;
	// - enter the names of the service(s) we want to inject into the arrays (as strings);
	// - enter the controller (callback) function back in as the last item in the array.
	// Now the service has been injected into the controller as an argument.
	// To used the service, the controller needs to store it into a variable ('menu' in
	// this case, passed to the function)
	.controller('MenuCtrl', ['foodFinder', 'orderManager', function (menu, orderManager) {
		// vm = view model
	    let vm = this;
        console.log('vm in menu.js = '+vm);

	    // Get the menu from the getMenu function of the 'foodFinder' service,
	    // which returns something like a promise
	    menu.getMenu().then(function(data){
        	console.log('getMenu in menu.js');
	    	vm.items = data;
        	console.log('vm.items 0 in menu.js = '+vm.items[0]);
        	console.log('vm.items 1 in menu.js = '+vm.items[1]);
        	console.log('vm.items 2 in menu.js = '+vm.items[2]);
	    });

		this.chooseItem = function(menuCategory, menuItemName) {
        	console.log('chooseItem in menu.js');
			orderManager.chooseMenuOption(menuCategory, menuItemName);
		};

		this.increment = function(item) {
        	console.log('increment in menu.js');
			//item.rating += 0.1;
			item.rating = ((item.rating * 10) + 1 ) / 10;
		};

		this.decrement = function(item) {
        	console.log('decrement in menu.js');
			//item.rating -= 0.1;
			item.rating = ((item.rating * 10) - 1 ) / 10;
		};
  }]);
