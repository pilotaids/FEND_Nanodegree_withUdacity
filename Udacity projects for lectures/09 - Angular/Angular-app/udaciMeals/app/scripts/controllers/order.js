'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
	.controller('OrderCtrl', ['orderManager', function (orderManager) {
		this.list = orderManager.getOrders();
		console.log('oredr list in order.js = '+this.list);

		this.setActiveDay = function(day) {
        	console.log('setActiveDay in order.js');
			orderManager.setActiveDay(day);
		}
	}]);
