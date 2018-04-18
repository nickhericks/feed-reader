/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This first test suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Lop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has URL', function() {
            for(const feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe(0);
            }
         });

        /* Loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has name', function() {
            for(const feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe(0);
            }
         });
    });



    describe('The menu', function() {
      const body = document.getElementsByTagName('body')[0];

      /* Ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('is hidden by default', function() {
          expect(body.className).toBe('menu-hidden');
       });

       /* Ensure the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('changes visibility when icon is clicked', function() {
          const menuIcon = document.querySelector('.menu-icon-link');

          // After first click the menu is showing
          menuIcon.click()
          expect(body.className).not.toBe('menu-hidden');

          // After second click the menu is hidden
          menuIcon.click()
          expect(body.className).toBe('menu-hidden');
        });
    });



    describe('Initial Entries', function() {
        var feed,
            entries,
            firstEntry;

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {

           loadFeed(0);

           done();
         });


         it('should be loaded', function(done) {
           feed = document.querySelector('.feed');
           entries = document.getElementsByClassName('.entry');
           firstEntry = entries[0];

           console.log(feed.className);
           console.log(entries);
           console.log(firstEntry);

           expect(feed.className).toBe('feed');

           done();
         });
     });



    describe('New Form Selection', function() {

        var feedListLast,
            feedEntriesBefore,
            feedEntriesAfter;

        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done) {

           loadFeed(0);

           feedListLast = document.querySelector('.feed-list li:last-child a');
           feedEntriesBefore = $('.feed a:last-child article')[0];

           feedListLast.click()

           done();
         });


         it('results in content changing', function(done) {
           var firstEntryBefore,
              firstEntryAfter,
              beforeContent,
              afterContent;

           firstEntryBefore = feedEntriesBefore.firstElementChild;
           beforeContent = firstEntryBefore.textContent;

           feedEntriesAfter = $('.feed a:last-child article')[0];
           firstEntryAfter = feedEntriesAfter.firstElementChild;
           afterContent = firstEntryAfter.textContent;

           expect(beforeContent === afterContent).not.toBe(true);

           done();
         });
     });
}());
