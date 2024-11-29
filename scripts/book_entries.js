// helper script containing common functionality for search.js and collection.js

// declare constant variables
const imgBase = "https://covers.openlibrary.org/b/id/";
const container = document.getElementById("books-container");

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

  container.append(figure);

  console.log("element created: " + entry.title); // FOR TESTING
}

/**
 * Populates the page with the results of the new query.
 * 
 * @param {object} json The JSON data from the API query.
 */
function populateEntries(json) {
  // remove old entries
  for (let child of Array.from(container.children)) {
    child.remove();
  }

  // build new entries
  let i = 0;
  json.docs.forEach(entry => {
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

// export functions
export { populateEntries };
