'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */

// When creating a module, pass an array as the second argument,
// even if empty (this would contain other modules this moduel
// depends on)
// To inject one module into an other, add the name of it (as string) into the array
// In this case we are adding the 'ui-router' module in the 'udaciMealsApp' module,
// (when adding the 'ui-router', add it as 'ui.router' ))
angular
  .module('udaciMealsApp', ['ui.router'])
  // Before the module is created, usa a '.config' method to configure how it gets 
  // setup. The '.config' method takes a function
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  	// Providers are like services, but they can only be used for module configuration
  	$urlRouterProvider.otherwise('/');


  	// Use 'stateProvider' to setup the different states of the app
  	$stateProvider
  	// Call the '.state' method to setup a state, give it a name and a config obj
  		.state('home', {
  			url: '/',
  			templateUrl: 'views/menu.html',
  			controller: 'MenuCtrl as menu'
  		})
  		.state('item', {
  			url: '/item/:id',
  			templateUrl: 'views/item.html',
  			controller: 'ItemCtrl as item'
  		})
  		// To add a nested view use the name of the 'view this view will be nested 
  		// inside' + '.' + 'the nested view's name'
  		// A controller will not be needed for the nested view because it will
  		// inherit the one from the parent's scope 
  		.state('item.nutrition', {
  			url: '/nutrition',
  			templateUrl: 'views/item-nutrition.html',
  		})
  		.state('item.reviews', {
  			url: '/reviews',
  			templateUrl: 'views/item-reviews.html',
  		});
  }]);

// Getting the module (always use after creating a module)
// angular
//   .module('udaciMealsApp');