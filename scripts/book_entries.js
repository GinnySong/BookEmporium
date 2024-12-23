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
  figure.setAttribute("data-bs-toggle", "modal");
  figure.setAttribute("data-bs-target", "#add-modal");

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
  });

  container.append(figure);

  console.log("element created: " + entry.title); // FOR TESTING
}

/**
 * Populates the page with the results of the new query.
 * 
 * @param {object} data_entries The data used to populate the results. Either from the API query or from localStorage.
 */
function populateEntries(data_entries) {
  // remove old entries
  for (let child of Array.from(container.children)) {
    child.remove();
  }

  // build new entries
  let i = 0;
  data_entries.forEach(entry => {
    if (i == 10) { // stop at 10 for now
      return;
    }
    // skip entries with no isbn
    if (typeof entry.isbn != 'undefined') {
      createBookEntry(entry);

      // set the current book whose info is being shown
      if (data_entries.length > 0) {
        current_book = data_entries.find((book) => book.isbn == entry.isbn);
      }

      i++;
    }
  });

  // update results counter
  let span = document.getElementById("book-num");
  span.textContent = i;

  console.log("data populated"); // FOR TESTING
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

function exportBooks(book_data) {
  let blob = new Blob([JSON.stringify(book_data)], { type: 'text/plain' });

  // create and activate a link where the url is the blob
  let url = window.URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.href = url;
  link.download = 'book_data.json';
  link.click();

  // delete url and link objects
  window.URL.revokeObjectURL(url);
  link.remove();
}

function checkDuplicate(book, list) {
  let dups = list.filter((dup) => dup.isbn == book.isbn);
  return dups.length > 0;
}

function displayError(container, msg) {
  let error_msg = document.createElement('p');
  error_msg.classList.add('alert', 'alert-danger');
  error_msg.textContent = msg;
  container.insertBefore(error_msg, container.children[0]);
}

// export functions
export { populateEntries, setBook, exportBooks, checkDuplicate, displayError, data, current_book };
