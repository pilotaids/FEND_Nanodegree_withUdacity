/*
 * AddressBook testing suite for synchronous functions
 */
describe("Address Book", function(){
	// Global vars for the synchronous tests
	var addressBook,
		thisContact;

	// Run this before all testing synchronous functions
	beforeEach(function(){
		// OOP approach
		addressBook = new AddressBook();
		thisContact = new Contact();
	});

	// Test adding a contact
	it("should be able to add a contact", function(){
		addressBook.addContact(thisContact);

		expect(addressBook.getContact(0)).toBe(thisContact);
	});

	// Test deleting a contact
	it("should be able to delete a contact", function(){
		addressBook.addContact(thisContact);
		addressBook.deleteContact(0);

		expect(addressBook.getContact(0)).not.toBeDefined();
	});
});

/*
 * AddressBook testing suite for asynchronous functions
 */
describe("Async Address Book", function(){
	// Global vars for the asynchronous tests
	var addressBook  = new AddressBook();

	// Run this before all testing asynchronous functions
	beforeEach(function(done){
		addressBook.getInitialContacts(function(){
			// done() signals to the framework when an...
			// ...asynchronous function has completed and...
			// ...and testing can be continued
			done();
		});
	});

	// Test getting initial contacts
	// Use done() to signal to the framework which of the tests...
	// ...relay on the asynchronous execution
	it("should grab initial contacts", function(done){
		expect(addressBook.initialComplete).toBe(true);
		done();
	});
});
