/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');

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
        // The 'fetch' method can receive a 'url-to-fetch' and a 'configuration object'
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            // the init/'headers' object is equivalent to the XHR '.setRequestHeader()' method
            headers: {
                Authorization: 'Client-ID 073c9ea49c40d535900dd3d4b6113fc06d2bb24273f0b534cbdc61ee9ccd681b'
            }
        })
            // 'fetch' returns a promise that needs to be handled with the '.json' method to be parse
            // and get the data we seek. whhich is then passe to the '.then' and used in the
            // 'addImage' function
            .then(response => response.json())
            .then(addImage)
            .catch(err => requestError(err, 'image'));

        /*
         * Articles from the NYT (nytimes.com)
         */
        // The 'fetch' method can receive a 'url-to-fetch' and a 'configuration object'
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=7308ce8a9b90414f9a21dc2610547e6b`)
            .then(response => response.json())
            .then(addArticles)
            .catch(err => requestError(err, 'articles'));
    });

    // The parameter 'images' has already been converted from JSON to s JS object by '.ajax'
    function addImage(data) {
        let htmlContent = '';

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

    // The parameter 'articles' has already been converted from JSON to s JS object by '.ajax'
    function addArticles(data) {
        let htmlContent = '';

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

    // The parameter 'articles' has already been converted from JSON to s JS object by '.ajax'
    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">
        	    Oh no! There was an error making a request for the ${part}.
        	</p>`);
    }

})();
