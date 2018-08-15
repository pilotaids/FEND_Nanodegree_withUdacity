'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.foodFinder
 * @description
 * # foodFinder
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
	.service('foodFinder', function () {
		// AngularJS will instantiate a singleton by calling "new"
		// on this function
		this.getMenu = function() {
        	console.log('setActiveDay in order.js');
			return $.get('/menu/menu.json');
		};

		this.getItem = function(id) {
        	console.log('id passed to getItem in order.js = '+id);
			let menuItemFile = `/menu/${id}.json`;
			return $.get(menuItemFile);
		};
	});
