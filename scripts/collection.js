// script for the collection page

// import functions from book_entries.js
import { populateEntries, setBook, data, current_book } from "./book_entries.js";

function editBookButtons() {
  document.querySelector("#edit-btn").addEventListener('click', () => {
    // add the book to the data list
    let index = data.collection.indexOf(current_book);
    data.collection[index] = setBook();

    // store the data locally
    let json = JSON.stringify(data);
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
    populateEntries(data.collection)
      .then(() => {
        // display the results header (if not already displayed)
        let header = document.querySelector("h2.invisible");
        if (header) {
          header.classList.remove("invisible");
        }
      });

    // book editing functionality
    editBookButtons();
  }
})();
