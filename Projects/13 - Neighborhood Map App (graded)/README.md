# Udacity FEND Neighborhood Map App

## Overview:
This is a single page React app that uses the Google Maps API and the Wikipedia API to list some of the most popular museums in New York City, New York.
This app was built as the last project for the Udacity's Front-End Web Developer Nanodegree. 

## Resources:
As mentions above, this app uses the following resources:
* [React:](https://reactjs.org) A JavaScript library commonly uses to build component-based interfaces.
* [MediaWiki:](https://www.mediawiki.org/wiki/API:Main_page) A web service providing easy access to wikipedia information.
* [Google Maps API:](https://developers.google.com/maps/documentation/javascript/tutorial) The Google API that allows you to use and customize maps.

## How to use the App:
* Node.js needs to be installed on the local device you plan on using the app with;
* Clone this repository; 
* Using a terminal app, navigate to the cloned repo and execute the following command (in that order):
-	`npm install`
-	`npm start`
* A default browser window will open and load the App. If the page doesn't load, used this [link](http://localhost:3000/)

## How to use the App in Production Mode:
To run the App in Production Mode you will need to have Python (version 2 or 3) installed.
If the you don't have the required software, it can be easily downloaded from Python's [website](https://www.python.org/).
Once Python is running, you will need to open up the terminal app, and lunch the server, based on the installed version of Python (run `python -V` to check).
-	To run the App in production mode execute the following command: `npm run build`;
-	For Python 2.x run `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use);
-	For Python 3.x, you can use `python -m http.server 8000`.
Once the Python server is running, you will be able to access the App on [port 8000](http://localhost:8000).

## For Developers
If you are a developer, and you'd like to get your 'hands dirty', feel free to look around the different directories.

### The Developers
Udacity & Marco Rosa (Udacity FEND student)