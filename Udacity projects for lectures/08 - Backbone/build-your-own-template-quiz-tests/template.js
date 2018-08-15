function template(str, delims) {
	// Set default delimeters
	var delimiter = {
		open: '*(',
		close: ')*'
	};
	// Array that will represent the template entered as the 'str' 
	// parameter to the function, but without the delimiters (default or
	// the ones entered as 'delims'). Initially empty
	var templateString = [];
	// Index used in the 'while' loop
	var i = 1;
	// Location of the first character of the closing delimiter
	var closingDelimiterLoc = 0;
	// Array that will represent the arguments to the returning function
	var functionArguments = [];
	// Variables used in the 'while' loop to save the values to push in the
	// templateString (both 'theVariable' & 'remaining'), and 
	// functionArguments ('theVariable' only)
	var theVariable, remaining;
	// Function used to wrap in quotes the sections of the template 
	// entered as the 'str' parameter that are not variables, whic in this
	// case are just the segments[0], and the values passed into 'remaining'
	var wrapInQuotes = function(strNotVar){
		return "'" + strNotVar + "'";
	};

	// Update defaut delimiters with custom ones, if passed in as 'delims'
	for (var key in delims)
		if (delims.hasOwnProperty(key))
			if (delims[key] !== undefined)
				delimiter[key] = delims[key];

	// Sections of the template entered as the 'str' parameter split by the
	// value of 'delimiter.open' ('*(' if defult is used)
	var segments = str.split(delimiter.open);
	// Variable used as the upper limit for the 'while' loop
	var numOfSegments = segments.length;

	// Since the first segment of the template entered as the 'str' parameter
	// will not contain any delimited (after the initial split by the
	// 'delimiter.open'), it can be pushed into the 'templateString' array
	// without making any further modifications to it. 
	// This is also why the index varibale of the 'while' loop ('i') is
	// initialized to 1, and not 0
	templateString.push(wrapInQuotes(segments[0]));

	// This 'while' loop slices the different 'segments' where it finds the 
	// first character of the 'delimiter.close' value (')*' if defult is used),
	// parses the variables out, pushed them into both the 'functionArguments'
	// array and the 'templateString' array, and then slices the 'segments'
	// once more past the 'delimiter.close' to grab whatever is left of the 
	// segment, that is not part of the variable, and pushes that into the 
	// 'templateString' array
	while(i < numOfSegments) {
		// Find the index of the first character of the 'delimiter.close'
		closingDelimiterLoc = segments[i].indexOf(delimiter.close);

		// Slice the segment to find the variable, ...
		theVariable = segments[i].slice(0, closingDelimiterLoc);
		// ... push the variable into the 'functionArguments', ...
		functionArguments.push(theVariable);
		// ... and 'templateString' arrays
		templateString.push(theVariable);

		// Grab the reminder of the segment past the 'delimiter.close' ...
		remaining = segments[i].slice(closingDelimiterLoc
										+ delimiter.close.length);
		// ... and push it into the 'templateString' array only
		templateString.push(wrapInQuotes(remaining));

		// Increment the 'while' loop counter
		i++;
	}

	// Create the body of the returning function by joining all the array
	// components of the 'templateString' plus any required code that will need
	// to be executed by the returning function (in this case the necessary 
	// setup for the while loop and the console.log of the joined
	// 'templateString')
	templateString = 'while(times--) {console.log('
								+ templateString.join('+') + ')}';

	// Return a new function with the arguents collected in the
	// 'functionArguments' array (and joined as comma-separated values - as 
	// needed to be presented as functino-arguments), a new argument called
	// 'times' representing how many times the string should be logged to 
	// the console, and the 'templateString' as the body of the function
	return new Function (functionArguments.join(','), 'times', templateString);
}
