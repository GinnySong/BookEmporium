// import { createElements, populateEntries } from "./book_entries.js"; // import functions from book_entries.js

// script for calling the book api and populating the page with entries

// declare constant variables
const queryBase = "https://openlibrary.org/search.json?";
const imgBase = "https://covers.openlibrary.org/b/isbn/";
const placeholder_img_url = "9780007136599-M.jpg";
const default_data = "../BookEmporium/data/example_book_collection.json";
const container = document.getElementById("books-container");
const form = document.getElementById("search-form");

function createElements() {
  // create a bunch of DOM elements

  // use a for loop where n=number of json data entries (for now, hard-coding)
  for (let i = 0; i < 6; i++) {
    // create figure element
    let figure = document.createElement("figure");
    figure.classList.add("book");

    // create image element for book cover
    let img = document.createElement("img");
    img.src = imgBase + placeholder_img_url;
    img.alt = "placeholder alt text";

    // create figure caption element
    let caption = document.createElement("figcaption");
    let captionText = document.createTextNode("placeholder text");

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
  }

  console.log("elements created"); // FOR TESTING
}

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
  img.src = imgBase + placeholder_img_url;
  img.alt = entry.Title + ", by " + entry.Author;

  // create figure caption element
  let caption = document.createElement("figcaption");
  let captionText = document.createTextNode(entry.Title + ", " + entry.Author);

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


  console.log("element created: " + entry.Title); // FOR TESTING
}

function addBook() {
  // save book to local storage, add the book data to the json file(?), change the button's text to "favorited"
  this.value = "Favorited";
  console.log("adding book!");
}

function populateEntries() {
  // get array of the figure elements that are children of books-container
  let figuresArray = container.querySelectorAll("figure");

  // loop through all of the figures and populate their information with the new search data
  figuresArray.forEach((figure) => {
    // update image element for book cover
    let img = figure.querySelector("img");
    img.src = imgBase + placeholder_img_url;
    img.alt = "The Fellowship of the Ring, by J.R.R. Tolkien";

    // update figure caption
    let caption = figure.querySelector("figcaption");
    let captionText = document.createTextNode("The Fellowship of the Ring, J.R.R. Tolkien");
    caption.replaceChild(captionText, caption.childNodes[0]);

    // update button ("Add" btn if not favorited, otherwise a different button(?))
    // TO BE IMPLEMENTED
    let btn = figure.querySelector("input");
    // btn.removeEventListener('click', addBook);
    btn.addEventListener('click', addBook);
  });

  console.log("data populated"); // FOR TESTING
}

function populateEntriesJson(json) {
  // remove old entries
  for (let child of Array.from(container.children)) {
    child.remove();
  }
  
  // build new entries
  // json[1].forEach(entry => createBookEntry(entry));

  for (let i = 0; i < 10; i++) {
    createBookEntry(json[i]);
  }

  // // get array of the figure elements that are children of books-container
  // // let figuresArray = container.querySelectorAll("figure");

  // // loop through all of the figures and populate their information with the new search data
  // figuresArray.forEach((figure) => {
  //   // update image element for book cover
  //   let img = figure.querySelector("img");
  //   img.src = imgBase + placeholder_img_url;
  //   img.alt = "The Fellowship of the Ring, by J.R.R. Tolkien";

  //   // update figure caption
  //   let caption = figure.querySelector("figcaption");
  //   let captionText = document.createTextNode("The Fellowship of the Ring, J.R.R. Tolkien");
  //   caption.replaceChild(captionText, caption.childNodes[0]);

  //   // update button ("Add" btn if not favorited, otherwise a different button(?))
  //   // TO BE IMPLEMENTED
  //   let btn = figure.querySelector("input");
  //   // btn.removeEventListener('click', addBook);
  //   btn.addEventListener('click', addBook);
  // });

  console.log("data populated"); // FOR TESTING
}

function callAPI() {
  // call the book API

}

function viewCollection() {
  fetch(default_data)
    .then(resp => resp.json())
    .then(json => populateEntriesJson(json));
}

// initialization function
(function () {
  // add event listener the search form submit button
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    ev.stopPropagation();

    // call api / search methods


    // create and add the book entry elements to the DOM if they haven't been added yet
    // if (container.childElementCount == 0) {
    //   createElements();
    //   createBtn();
    // }

    // populate the entries based on the data from the search query
    // populateEntries();

    viewCollection();
  });
})();
