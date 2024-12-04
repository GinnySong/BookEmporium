// script for the collection page

// import functions from book_entries.js
import { populateEntries, setBook, data, current_book } from "./book_entries.js";

function toggleFilterForm() {
  let filter = document.getElementById("search-form");
  if (filter.classList.contains("invisible")) {
    filter.classList.remove("invisible");
  } else {
    filter.classList.add("invisible");
  }
}

function editBookButtons() {
  document.getElementById("edit-btn").addEventListener('click', () => {
    // add the book to the data list
    let index = data.collection.indexOf(current_book);
    data.collection[index] = setBook();

    // store the data locally
    let json = JSON.stringify(data.collection);
    localStorage.setItem('collection', json);
    console.log("clicking 'edit book' button!");
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
  // on page load, load all the books from localStorage and populate the page with their data
  console.log(data); // FOR TESTING
  let storedCollection = JSON.parse(localStorage.getItem("collection"));
  if (storedCollection) {
    data.collection = storedCollection;
    console.log(data); // FOR TESTING
    populateEntries(data.collection);

    // display the results header (if not already displayed)
    let header = document.querySelector("h2.invisible");
    if (header) {
      header.classList.remove("invisible");
    }

    // book editing functionality
    editBookButtons();
  }

  // toggle the filter form's visibility when the filter button is clicked
  document.getElementById("filter-btn").addEventListener('click', () => toggleFilterForm());

  // clear all books in collection from localStorage
  document.getElementById("clear-all-btn").addEventListener('click', () => {
    localStorage.removeItem("collection");
    data.collection = [];
    populateEntries(data.collection);
  });
})();
