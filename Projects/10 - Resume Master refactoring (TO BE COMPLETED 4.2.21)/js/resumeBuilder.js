/*
This is empty on purpose! Your code to build the resume will go here.
 */

let bio = {
    name: "Marco Rosa",
    role: string,
    contacts: {
		mobile: string,
		email: string,
		github: string,
		twitter: string, //(optional)
		location: string
    },
    welcomeMessage: string,
    skills: array of strings,
    biopic: string url,
    display: function taking no parameters
}

let education = {
            schools: [
	            {
	                name: string,
	                location: string,
	                degree: string,
	                majors: array of strings,
	                dates: string, //(works with a hyphen between them)
	                url: string //(optional)
	            }
            ],
            onlineCourses: [
	            {
	                title: string,
	                school: string,
	                dates: string, //(works with a hyphen between them)
	                url: string
               	}
            ],
            display: function taking no parameters
}

let work = {
            jobs: [
	            {
	                employer: string,
	                title: string,
	                location: string,
	                dates: string, //(Can be 'in progress')
	                description: string
            	}
            ],
            display: function taking no parameters
}

let projects = {
            projects: [
	            {
	                title: string,
	                dates: string, //(works with a hyphen between them)
	                description: string,
	                images: array with string urls
            	}
            ],
            display: function taking no parameters
}


2. Iterate through each javaScript object and append its information to index.html
in the correct section.
  * First off, you’ll be using jQuery’s `selector.append()` and 
  `selector.prepend()` functions to modify index.html. `selector.append()` makes
  an element appear at the end of a selected section. `selector.prepend()` makes
  an element appear at the beginning of a selected section.
    * Pay close attention to the ids of the `<div>`s in index.html and the HTML
    snippets in helper.js. They’ll be very useful as jQuery selectors for
    `selector.append()` and `selector.prepend()`
  * You’ll also be using the JavaScript method `string.replace(old, new)` to swap
  out all the placeholder text (e.g. `%data%`) for data from your resume JSON
  objects.
  * Here’s an example of some code that would add the location of one your
  companies to the page:
    * `var formattedLocation = HTMLworkLocation.replace("%data%",
    	work.jobs[job].location);`
    * `$(".work-entry:last").append(formattedLocation);`
  * Use the mockup at the page of this document as a guide for the order in which
  you should append elements to the page.

3. The resume includes an interactive map. Do the following to add it. 
  * In resumeBuilder.js, append the googleMap string to `<div id=”mapDiv”>`.
  * In index.html, uncomment the Google script element:
  `<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places">
  </script>`
  * In helper.js, at the bottom of the file, uncomment code to initialize map
  and set fitBounds.
4. All of your code for adding elements to the resume should be contained within
functions.

5. As described in the javaScript object schema, each 'display' function should
be encapsulated within the javaScript object it displays in the resume. For
instance, your 'display' function for appending 'work' experience data to the
resume should be encapsulated within the 'work' javaScript object. The 'display'
function can be encapsulated within the 'work' javaScript object definition in
the same way other properties are defined there, or it can be encapsulated later
in the file using dot notation. For example: `work.display =`

6. It’s possible to make additional information show up when you click on the
pins in the map. Check out line 174 in helper.js and the Google Maps API to
get started.
