// import { createElements, populateEntries } from "./book_entries.js"; // import functions from book_entries.js

// script for calling the book api and populating the page with entries

// declare constant variables
const queryBase = "https://openlibrary.org/search.json?";
const imgBase = "https://covers.openlibrary.org/b/id/";
const placeholder_img_url = "9780007136599-M.jpg";
const default_data = "../BookEmporium/data/example_book_collection.json";
const container = document.getElementById("books-container");
const form = document.getElementById("search-form");

// separate function for creating button elements in case i get the importing functions working
function createBtn() {
  let figuresArray = container.querySelectorAll("figure");
  figuresArray.forEach((figure) => {
    // create button
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Add";
    btn.classList.add("search-entry-btn", "add-btn");
    figure.appendChild(btn);
  });
}

function createBookEntry(entry) {
  // create figure element
  let figure = document.createElement("figure");
  figure.classList.add("book");

  // create image element for book cover
  let img = document.createElement("img");
  img.src = imgBase + entry.cover_i + "-M.jpg";
  img.alt = entry.title + ", by " + entry.author_name;

  // create figure caption element
  let caption = document.createElement("figcaption");
  let captionText = document.createTextNode(entry.title + ", by " + entry.author_name);

  // // create button
  // let btn = document.createElement("input");
  // btn.type = "button";
  // btn.value = "Add";
  // btn.classList.add("search-entry-btn", "add-btn");

  // append elements to their respective parents
  caption.appendChild(captionText);
  figure.appendChild(img);
  figure.appendChild(caption);
  // figure.appendChild(btn);

  container.append(figure);

  console.log("element created: " + entry.title); // FOR TESTING
}

function addBook() {
  // TO BE IMPLEMENTED
  // save book to local storage, add the book data to the json file(?), change the button's text to "favorited"
  this.value = "Favorited";
  console.log("adding book!");
}

function populateEntries(json) {
  // remove old entries
  for (let child of Array.from(container.children)) {
    child.remove();
  }

  // build new entries
  let i = 0;
  json.docs.forEach(entry => {
    if (i == 10) {
      return;
    }
    // skip entries with no isbn
    if (typeof entry.isbn != 'undefined') {
      createBookEntry(entry);
      i++;
    }
  });

  // update results counter
  let span = document.getElementById("book-num");
  span.textContent = i;

  console.log("data populated"); // FOR TESTING
}

function buildUrl() {
  let query = form.elements["search-query"].value;
  query = query.replaceAll(" ", "+"); // replace spaces with +
  return queryBase + "q=" + query;
}

function searchCollection() {
  validateQuery();
  let url = buildUrl();
  console.log(url); // FOR TESTING

  fetch(url)
    .then(resp => resp.json())
    .then(json => populateEntries(json))
    .then(() => {
      // display the results header (if not already displayed)
      let header = document.querySelector("h2.invisible");
      if (header) {
        header.classList.remove("invisible");
      }
    });
}

/**
 * Initialization function.
 */
(function () {
  // add event listener the search form submit button
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    ev.stopPropagation();

    // fetch the data and populate the page with the results
    searchCollection();
  });
})();
