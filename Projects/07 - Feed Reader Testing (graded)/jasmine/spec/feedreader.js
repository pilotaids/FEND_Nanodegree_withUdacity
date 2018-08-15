/* feedreader.js
 *
 * This contains all of the tests that will be run against the
 * web feed-reader application provided
 */
$(function() {
    /* "RSS Feeds" test suite */
    describe('RSS Feeds', function() {
        // This test ensures the allFeeds variable has been defined
        // and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test ensures the feeds within the allFeeds object have
        // a URL defined and that the URL is not empty
        it('all URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // This test ensures the feeds within the allFeeds object have
        // a name defined and that the name is not empty
        it('all names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* "The menu" test suite */
    describe('The menu', function() {
        // This test ensures the menu element is hidden by default
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // These tests ensure the menu changes visibility when the
        // menu icon is clicked
        it('changes visibility when the menu icon is clicked', function() {
            // First click shows the menu by taking the 'menu-hidden'
            // class out
            document.querySelector('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Second click hides the menu by adding back the
            // 'menu-hidden' class
            document.querySelector('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {
        // Ensuring the asynchronous function has completed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // This test ensures the loadFeed function has at least a 
        // single .entry element within the .feed container when
        // it is called and has completed its work
        it('one or more .entry present after calling the loadFeed function', function(done) {
            var num = document.querySelector('.feed').getElementsByClassName('entry').length;
            expect(num).toBeGreaterThan(0);
            done();
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {
        // Test suite variable accessible by the tests within this suite
        var oldFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Ensuring the asynchronous function has completed
        beforeEach(function(done) {
            loadFeed(0, function() {
                // get the previous feed
                oldFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        // This test ensures the feed's content changes when a new 
        // feed is loaded by the loadFeed function
        it("new feed loaded and its content changed", function(done) {
            expect(oldFeed).not.toBe(document.querySelector(".feed").innerHTML);
            done();
        });
    });

}());
