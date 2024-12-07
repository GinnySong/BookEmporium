// script for the readLater page

// import functions from book_entries.js
import { populateEntries, setBook, exportBooks, data, current_book } from "./book_entries.js";

function toggleFilterForm() {
  let filter = document.getElementById("search-form");
  if (filter.classList.contains("invisible")) {
    filter.classList.remove("invisible");
  } else {
    filter.classList.add("invisible");
  }
}

function editBookButtons() {
  // add click event listener for the edit button
  document.getElementById("edit-btn").addEventListener('click', () => {
    console.log("clicking 'edit' button!");
    // add the book to the data list
    let index = data.readLater.indexOf(current_book);
    data.readLater[index] = setBook();

    // store the data locally
    let json = JSON.stringify(data.readLater);
    localStorage.setItem('readLater', json);

    // repopulate entries
    populateEntries(data.readLater);
  });

  
  // remove a book
  document.getElementById("remove-btn").addEventListener('click', () => {
    console.log("clicking 'remove' button!");
    let index = data.readLater.indexOf(current_book);
    data.readLater.splice(index, 1);

    // store the data locally
    let json = JSON.stringify(data.readLater);
    localStorage.setItem('readLater', json);

    // repopulate entries
    populateEntries(data.readLater);
  });
}

/**
 * Initialization function.
 */
(function () {
  // on page load, load all the books from localStorage and populate the page with their data
  let storedReadLater = JSON.parse(localStorage.getItem("readLater"));
  if (storedReadLater) {
    data.readLater = storedReadLater;
    populateEntries(data.readLater);

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

  // export all books in readLater to a json file
  document.getElementById("export-btn").addEventListener('click', () => exportBooks(data.readLater));

  // clear all books in readLater from localStorage
  document.getElementById("clear-all-btn").addEventListener('click', () => {
    localStorage.removeItem("readLater");
    data.readLater = [];
    populateEntries(data.readLater);
  });
})();
