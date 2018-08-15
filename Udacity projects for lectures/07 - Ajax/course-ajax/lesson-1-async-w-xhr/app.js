(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');

    const unsplashRequest = new XMLHttpRequest();
    const articleRequest = new XMLHttpRequest();

    let searchedForText;


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Reset the content of the HTML response section in the index.html file
        responseContainer.innerHTML = '';
        // Get the value from the search field on the header of the page
        searchedForText = searchField.value;


        /*
         * Image from 'Unsplash.com'
         */
        //'.open()'' method sets the HTTP method and the URL of the resource to be fetched
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        //'.onload' property - set this to a function that will run upon a successful fetch
        //'.onerror' property - set this to a function that will run when an error occurs
        unsplashRequest.onload = addImage;
        // '.setRequestHeader()' - sets the value of an HTTP request header
        // You must call it after open(), but before send()
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 073c9ea49c40d535900dd3d4b6113fc06d2bb24273f0b534cbdc61ee9ccd681b');
        //'.send()'' method - send the request
        unsplashRequest.send();

        // function used as the 'onload' function
        function addImage() {
            let htmlContent = '';
            // JSON.parse() converts the JSON response into a JavaScript object
            // Here 'this' represents the 'unsplashRequest' since the function gets
            // passed as the 'onload' funtion to the XHR request ('unsplashRequest'
            // in this case)
            // .responseText property - holds the text of the async request's response
            const data = JSON.parse(this.responseText);

            if (data && data.results && data.results[0]) {
                const firstImage = data.results[0];

                htmlContent = `<figure>
	                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
	                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
	            </figure>`;
            } else {
                htmlContent = `<div class="error-no-image">No images available</div>`;
            }

            // Insert the html content on the page (at the beginning of the page)
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }


        /*
         * Articles from the NYT (nytimes.com)
         */
        //'.open()'' method sets the HTTP method and the URL of the resource to be fetched
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=7308ce8a9b90414f9a21dc2610547e6b`);
        //'.onload' property - set this to a function that will run upon a successful fetch
        //'.onerror' property - set this to a function that will run when an error occurs
        // Since the New York Times doesn't require a specific header, we don't need to do
        // anything special. We'll just set its onload property to the function addArticles
        articleRequest.onload = addArticles;
        //'.send()'' method - send the request
        articleRequest.send();

        // function used as the 'onload' function
        function addArticles() {
            let htmlContent = '';
            // JSON.parse() converts the JSON response into a JavaScript object
            // Here 'this' represents the 'articleRequest' since the function gets
            // passed as the 'onload' funtion to the XHR request ('articleRequest'
            // in this case)
            // .responseText property - holds the text of the async request's response
            const data = JSON.parse(this.responseText);

            if (data.response && data.response.docs && (data.response.docs.length > 1)) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                	    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                	    <p>${article.snippet}</p>
                    </li>`);
            } else {
                htmlContent = `<div class="error-no-image">No articles available</div>`;
            }

            // Insert the html content on the page (at the end of the page)
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
    });

})();
