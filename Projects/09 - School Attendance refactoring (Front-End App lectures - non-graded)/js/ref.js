/*
 * Model / data
 */
var model = {
    // Set an object's key to keep track of the current cat
    current: null,
    admin: false,
    // Array of cat objects with their properties
    cats: [
        {
            catName: 'Kitten 1',
            linkSrc:'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
            clicks: 0
        },
        {
            catName: 'Kitten 2',
            linkSrc:'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
            clicks: 0
        },
        {
            catName: 'Kitten 3',
            linkSrc:'https://top13.net/wp-content/uploads/2016/09/cutest-kittens-ever-9.jpg',
            clicks: 0
        },
        {
            catName: 'Kitten 4',
            linkSrc:'http://openwalls.com/image/22198/cute_kitten_8_1920x1080.jpg',
            clicks: 0
        },
        {
            catName: 'Kitten 5',
            linkSrc:'http://www.laughspark.info/thumbfiles/705x705//1-cute-kitten-playing-with-fun-635726822891482499-2195.png',
            clicks: 0
        },
        {
            catName: 'Kitten 6',
            linkSrc:'http://www.lovethispic.com/uploaded_images/26677-Cute-Kitten.jpg',
            clicks: 0
        }
    ]
};

/*
 * Octopus: connecting the Model with the Views
 */
var octopus = {

    init: function() {
        // Initialize current to show something at the beginneing
        model.current = model.cats[0];
        // Initialize the views
        viewList.init();
        viewCat.init();
        viewAdmin.init();
        this.hideAdmin();
    },

    // Returns the currently selected cat (cats[0] at initialization)
    getCurrent: function() {
        return model.current;
    },

    // Sets the current cat to the one passed-in as parameter
    setCurrent: function(cat) {
        model.current = cat;
    },

    // Returns the cats object array
    getCats: function() {
        return model.cats;
    },

    // Increments a cat's clicks' count
    incrementClicks: function() {
        model.current.clicks++;
        viewCat.render();
    },

    // Update the name of the selected cat
    updateList: function(catName, linkSrc, clicks) {
        model.current.catName = catName;
        model.current.linkSrc = linkSrc;
        model.current.clicks = clicks;
        viewCat.render();
    },

    // Show the Admin View
    showAdmin: function() {
        model.admin = true;
        viewAdmin.adminForm.classList.remove('hide_form');
    },

    // Hide the Admin View
    hideAdmin: function() {
        model.admin = false;
        viewAdmin.adminForm.classList.add('hide_form');
    },

    // Returns the cats object array
    toggleAdmin: function() {
        model.admin = !model.admin;
        viewAdmin.adminForm.classList.toggle('hide_form');
    },

    // Update the name of the selected cat
    resetCurrent: function() {
        this.showAdmin();
        viewAdmin.render();
    },

    // Update the name of the selected cat
    updateCurrent: function() {
        model.current.catName = viewAdmin.catName.value;
        model.current.linkSrc = viewAdmin.image.value;
        model.current.clicks = parseInt(viewAdmin.clicks.value);
        viewList.render();
        viewCat.render();
        this.hideAdmin();
        viewAdmin.render();
    }
};

/*
 * Cat View: handles the GUI of the clicked cat
 */
var viewCat = {

    // Initialize this view
    init: function() {
        // Get DOM element(s) that will need to be manipulated
        this.cat = document.getElementById('cat');
        this.catName = document.getElementById('cat-name');
        this.image = document.getElementById('cat-img');
        this.clicks = document.getElementById('cat-clicks');

        // Add event listener to the image to increment clicks'
        // when clicked
        this.image.addEventListener('click', function() {
            octopus.incrementClicks();
        });

        // Initial render of this view
        this.render();
    },

    // Render this view (called on init, and when an update is necessary)
    render: function() {
        // Update the DOM with new data
        this.catName.textContent = octopus.getCurrent().catName;
        this.image.src = octopus.getCurrent().linkSrc;
        // Handle propet text for the cat's click-counter
        switch(octopus.getCurrent().clicks) {
            case 0:
                this.clicks.textContent = `This kitten needs some clicks!`;
                break;
            case 1:
                this.clicks.textContent = `1 click for this kitten!`;
                break;
            default:
                this.clicks.textContent = `${octopus.getCurrent().clicks} clicks for this kitten!`;
        }
    }
};

/*
 * Cats List View: handles the GUI of the cats' list
 */
var viewList = {

    // Initialize this view
    init: function() {
        // Get DOM element(s) that will need to be manipulated
        this.list = document.getElementById('side-list');

        // Initial render of this view
        this.render();
    },

    // Render this view (should not need to be other than on init)
    render: function() {
        while (this.list.hasChildNodes()) {
            this.list.removeChild(this.list.lastChild);
        }
        // Create a document-fragment to enhance reflow-repaint ops
        const fragment = document.createDocumentFragment();
        // Get the cats object array from the model through the octopus
        const cats = octopus.getCats();

        for (let i = 0; i < cats.length; i++) {
            // Create new 'div' element
            const newElement = document.createElement('li');
            // Set initial attributes and content for the new 'li'
            newElement.className = 'cats-items';
            newElement.textContent = cats[i].catName;

            // Add event listener to the new 'li' with
            // closure-in-a-loop that returns the necessary actions
            newElement.addEventListener('click', (function(cat) {
                return function() {
                    octopus.setCurrent(cat);
                    viewCat.render();
                    viewAdmin.render();
                }
            })(cats[i]));

            // Appent new 'li' to the document-fragment
            fragment.appendChild(newElement);
        }

        // Appent the document-fragment to the ul, reflow, and repaint
        this.list.appendChild(fragment);
    }
};

/*
 * Cat View: handles the GUI of the clicked cat
 */
var viewAdmin = {

    // Initialize this view
    init: function() {
        // Get DOM element(s) that will need to be manipulated
        this.adminButton = document.getElementById('admin_btn');
        this.adminForm = document.getElementById('admin_form');
        this.catName = document.getElementById('admin_name');
        this.image = document.getElementById('admin_url');
        this.clicks = document.getElementById('admin_clicks');
        this.cancelButton = document.getElementById('cancel_btn');
        this.saveButton = document.getElementById('save_btn');

        // Add event listener to the 'Advanced' button to show/hide
        // the advanced form
        this.adminButton.addEventListener('click', function() {
            octopus.toggleAdmin();
        });

        // Add event listener to the 'Cancel' button to reset the
        // info and update the views
        this.cancelButton.addEventListener('click', function(event) {
            event.preventDefault();
            octopus.resetCurrent();
        });

        // Add event listener to the 'Save' button to save the new
        // info and update the views
        this.saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            octopus.updateCurrent();
        });

        // Initial render of this view
        this.render();
    },

    // Render this view (called on init, and when an update is necessary)
    render: function() {
        // Fill in the input fields with the current cat's info
        this.catName.value = octopus.getCurrent().catName;
        this.image.value = octopus.getCurrent().linkSrc;
        this.clicks.value = octopus.getCurrent().clicks;
    }
};


// Lunch the app!
octopus.init();
