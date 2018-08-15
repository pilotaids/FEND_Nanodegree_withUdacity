// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//
// EXAMPLE:
// function purchase(item) { console.log( 'purchasing ' + item); }
// function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }
//
// var nephewParties = new EventTracker( 'nephews ');
// var richard = new EventTracker( 'Richard' );
//
// nephewParties.on( 'mainEvent', purchase );
// richard.on( 'mainEvent', celebrate );
// nephewParties.notify( richard, 'mainEvent' );
//
// nephewParties.trigger( 'mainEvent', 'ice cream' );
//

/*
 * ES6 Class version
 */
class EventTracker {

	constructor(name){
	    this.name = name;
	    this._events = {};
	    this._notify = {};
	}

    on(event, callback) {
    	if (this._events[event] === undefined)
    		this._events[event] = [];

    	this._events[event].push(callback);
    }
    
    notify(otherObj, event)  {
    	if (this._notify[event] === undefined)
    		this._notify[event] = [];

    	this._notify[event].push(otherObj);
    }
    
    trigger(event, data){
    	if (this._notify[event] === undefined)
			this._notify[event] = [];

		if (this._events[event] === undefined)
			this._events[event] = [];

    	let callbacksForEvent = this._events[event];
    	let objToNotify = this._notify[event];

    	for (let i = 0; i < callbacksForEvent.length; i++)
    		callbacksForEvent[i].call(this, data);

    	for (let i = 0; i < objToNotify.length; i++)
    		objToNotify[i].trigger(event, data);
    }
}


/*
 * ES5 Function versions
 */
// var EventTracker = function(name) {
//     this.name = name;
//     this._events = {};
//     this._notify = {};
// };

// EventTracker.prototype.on = function(event, callback) {
// 	if (this._events[event] === undefined)
// 		this._events[event] = [];

// 	this._events[event].push(callback);
// };
    
// EventTracker.prototype.notify = function(otherObj, event)  {
// 	if (this._notify[event] === undefined)
// 		this._notify[event] = [];

// 	this._notify[event].push(otherObj);
// };

// EventTracker.prototype.trigger = function(event, data){
// 	if (this._notify[event] === undefined)
// 		this._notify[event] = [];

// 	if (this._events[event] === undefined)
// 		this._events[event] = [];

// 	var callbacksForEvent = this._events[event];
// 	var objToNotify = this._notify[event];

// 	for (let i = 0; i < callbacksForEvent.length; i++) {
// 		callbacksForEvent[i].call(this, data);
// 	}

// 	for (let i = 0; i < objToNotify.length; i++) {
// 		objToNotify[i].trigger(event, data);
// 	}
// };

