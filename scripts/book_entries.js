// script for populating the page with book entries
// contains common functionality for search.js and collection.js

// declare constant variables
const imgBase = "https://covers.openlibrary.org/b/id/";
const container = document.getElementById("books-container");
let current_book;
let data = { 'collection': [], 'readLater': [] };

/**
 * Creates a book entry to add to the populated page.
 * 
 * @param {object} entry The book object to add.
 */
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

  // append elements to their respective parents
  caption.appendChild(captionText);
  figure.appendChild(img);
  figure.appendChild(caption);

  // add click event listener
  figure.addEventListener('click', (ev) => {
    ev.stopPropagation();
    console.log("book clicked: " + entry.title + ", by " + entry.author_name);
    let form = document.querySelector("#add-modal form");
    form.title.value = entry.title;
    form.author.value = entry.author_name;
    // json data requires using the first index of the isbn field, localStorage data does not
    if (entry.isbn[0] < 10) {
      form.isbn.value = entry.isbn;
    } else {
      form.isbn.value = entry.isbn[0];
    }
    form["cover-id"].value = entry.cover_i;

    current_book = data.collection.find((book) => book.isbn == entry.isbn);
  });

  container.append(figure);

  console.log("element created: " + entry.title); // FOR TESTING
}

/**
 * Populates the page with the results of the new query.
 * 
 * @param {object} data The data used to populate the results. Either from the API query or from localStorage.
 */
function populateEntries(data) {
  // remove old entries
  for (let child of Array.from(container.children)) {
    child.remove();
  }

  // build new entries
  let i = 0;
  data.forEach(entry => {
    if (i == 10) { // stop at 10 for now
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

/**
 * Adds button elements to book entries.
 */
function createBtn() {
  let figuresArray = container.querySelectorAll("figure");
  figuresArray.forEach((figure) => {
    // create button
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Add";
    btn.classList.add("search-entry-btn", "add-btn");

    btn.addEventListener('click', () => {
      // TO BE IMPLEMENTED
      // save book to local storage, add the book data to the json file(?), change the button's text to "favorited"
      btn.value = "Favorited";
      console.log("adding book!");
    });

    figure.appendChild(btn);
  });
}

function setBook() {
  let modalForm = document.querySelector("#add-modal form");
  // make a new book object with the form values
  let book = {};
  book.title = modalForm.title.value;
  book.author_name = modalForm.author.value;
  book.isbn = modalForm.isbn.value;
  book.cover_i = modalForm["cover-id"].value;

  return book;
}

// export functions
export { populateEntries, setBook };
