# Feed Reader Testing Overview

This project presents a web-based application that reads RSS feeds and the related Testing-Suites ensuring the web-app runs properly and wihout any code-related issues.

The code for the web-app was given to me (a student) by the Udacity FEND developers; all I implemented was the testing `feedreader.js` file in the `jasmine/spec` directory.

Most of the testing was implemented using the help of the jQuery library and the testing lectures covered before this project (mainly the AddressBook example).

Further testing can be implemented upon modifications to the app, but the testing suites developed so far should be able to run properly unless some major reorganization of the app core code gets done.


## How to run the application

To Run the Feed Reader Testing app, any user will have to ensure all parts of it are downloaded properly, and that the Jasmine library is included. Without the above mentioned library, the app will not be able to perform the tests.

Once the app has been downloaded properly, simply lunch the index.html file in your favorite browser, play with the app as much as you like, and you'll be able to look at the test results at the bottom of the page.


## For Developers

If you are a developer, and you'd like to get your 'hands dirty', feel free to look in the `jasmine/spec` directory where you will find the `feedreader.js` file where all the testing is executed. You can also open the `app.js` file in the `js` directory to modify the behaviour of the app to perform counter-tests to ensure the testing reports both pass and fail conditions appropriately. 


### The Developer
Marco Rosa - Udacity FEND student
