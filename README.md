# feed-reader - testing with Jasmine (Udacity project)

This project is part of Udacity's Front End Web Developer nanodegree program. Demonstrates experience using [Jasmine](http://jasmine.github.io/) to write a number of tests against a pre-existing application.

## Introduction

This feed reader links to articles for you to read later.

## How to run the application

You can [access the application here](https://nickhericks.github.io/feed-reader) or download the repository to you local computer and open the index.html file in a web browser of your choice. At the bottom of the page you will see the Jasmine testing interface showing all tests passing.

## Resources

* [Udacity project repository on GitHub](https://github.com/udacity/frontend-nanodegree-feedreader)

## Todos

* Finish unit testing
* Update favicon

## Project Requirements

Udacity provided project rubric for students to ensure project is up to spec. [Student requirement details](https://review.udacity.com/#!/rubrics/18/view)

Unit tests written include:
1. Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
2. Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
3. Write a new test suite named `"The menu"`.
4. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
5. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
6. Write a test suite named `"Initial Entries"`.
7. Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
8. Write a test suite named `"New Feed Selection"`.
9. Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
10. No test should be dependent on the results of another.
11. Callbacks should be used to ensure that feeds are loaded before they are tested.
12. Implement error handling for undefined variables and out-of-bound array access.
13. When complete - all of your tests should pass.

## Credits and acknowledgements

* [Project code](https://github.com/udacity/frontend-nanodegree-feedreader) provided by Udacity.
* Unit testing scripts in feedreader.js written by Nick Hericks.
