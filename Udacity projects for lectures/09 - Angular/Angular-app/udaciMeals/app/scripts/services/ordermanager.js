'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.orderManager
 * @description
 * # orderManager
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('orderManager', function () {
    // AngularJS will instantiate a singleton by calling "new"
    // on this function
    let selectedDay = 'Monday';

    let orderSelection = {
    	Monday: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Tuesday: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Wednesday: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Thursday: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Friday: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    };

    this.getActiveDay = function() {
        console.log('getting the active day in ordermanager.js');
    	return selectedDay;
    };

    this.setActiveDay = function(day) {
        console.log('setting the active day in ordermanager.js');
    	selectedDay = day;
    };

    this.chooseMenuOption = function(meal, menuItem) {
        console.log('setting menuItem from chooseMenuOption in ordermanager.js');
    	orderSelection[selectedDay][meal] = menuItem;
    };

    this.removeMenuOption = function(day, menuCategory) {
        console.log('remove selected menuItem from removeMenuOption in ordermanager.js');
    	orderSelection[day][menuCategory] = '';
    };

    this.getOrders = function() {
        console.log('getOrders in ordermanager.js');
        console.log('orderSelection in ordermanager.js = '+orderSelection);
        return orderSelection;
    };
  });
