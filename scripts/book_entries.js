// helper script containing common functionality for search.js and collection.js

// declare constant variables
const imgBase = "https://covers.openlibrary.org/b/isbn/";
const placeholder_img_url = "9780007136599-M.jpg";
const container = document.getElementById("books-container");

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

    // create button
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Add";
    btn.classList.add("search-entry-btn", "add-btn");

    // append elements to their respective parents
    caption.appendChild(captionText);
    figure.appendChild(img);
    figure.appendChild(caption);
    figure.appendChild(btn);
    
    container.append(figure);
  }

  console.log("elements created"); // FOR TESTING
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
  });

  console.log("data populated"); // FOR TESTING
}

// export funtions
export { createElements, populateEntries };
