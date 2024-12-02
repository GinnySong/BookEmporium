// script for calling the book api and populating the page with entries

// import functions from book_entries.js
import { populateEntries, setBook } from "./book_entries.js";

// declare constant variables
const queryBase = "https://openlibrary.org/search.json?q=";
const form = document.getElementById("search-form");

function saveBookButtons() {
  document.querySelector("#collection-btn").addEventListener('click', () => {
    // add the book to the data list
    data.collection.push(setBook());

    // store the data locally
    let json = JSON.stringify(data);
    localStorage.setItem("collection", json);
    console.log("clicking 'add to collection' button!");
  });

  document.querySelector("#read-later-btn").addEventListener('click', () => {
    // add the book to the data list
    data.readLater.push(setBook());

    // store the data locally
    let json = JSON.stringify(data);
    localStorage.setItem("readLater", json);
    console.log("clicking 'add to read later' button!");
  });
}

/**
 * Construct a URL based on the value of the query.
 * 
 * @returns The constructed URL.
 */
function buildUrl() {
  // query input has 'required' attribute, so will not be empty
  let query = form.elements["search-query"].value;
  query = query.replaceAll(" ", "+"); // replace spaces with +
  return queryBase + query;
}

/**
 * Initialization function.
 */
(function () {
  // add event listener to the search form's submit button to call the book API
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    ev.stopPropagation();

    // get the url
    let url = buildUrl();
    console.log(url); // FOR TESTING

    // fetch the data and populate the page with the results
    fetch(url)
      .then(resp => resp.json())
      .then(json => populateEntries(json.docs))
      .then(() => {
        // display the results header (if not already displayed)
        let header = document.querySelector("h2.invisible");
        if (header) {
          header.classList.remove("invisible");
        }
      });
    saveBookButtons();
  });
})();
