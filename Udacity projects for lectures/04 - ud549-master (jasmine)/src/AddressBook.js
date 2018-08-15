function AddressBook(){
	this.contacts = [];
	this.initialComplete = false;
}

// AddressBook - Method to add a contact
AddressBook.prototype.addContact = function(contact){
	this.contacts.push(contact);
}

// AddressBook - Method to get a contact
AddressBook.prototype.getContact = function(index){
	return this.contacts[index];
}

// AddressBook - Method to delete a contact
AddressBook.prototype.deleteContact = function(index){
	this.contacts.pop(index);
//	this.contacts.splice(index, 1);
}

// AddressBook - 'Fake' asynchronous function for initial-contacts
AddressBook.prototype.getInitialContacts = function(cb){
	var self = this;

	setTimeout(function(){
		self.initialComplete = true;
		if(cb){
			return cb();
		}
	}, 3);
}
