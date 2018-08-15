'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
	.controller('ItemCtrl', ['$stateParams', 'foodFinder', function ($stateParams, foodFinder) {
		let vm = this;
        console.log('vm in item.js = '+JSON.stringify(vm));
        console.log('$stateParams in item.js = '+JSON.stringify($stateParams));

		foodFinder.getItem($stateParams.id).then(function(data) {
			vm.data = data;
        	console.log('vm.data in item.js = '+JSON.stringify(vm.data));
		});
	}]);
