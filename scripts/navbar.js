// script for dynamically adding the nav bar to a page

function buildNavBar() {
  // TODO
}

/**
 * When navbar-toggler is present (medium screen size and lower),
 * make the bottom corners of the navbar rounded when 
 * navbar is expanded and straight when navbar is collapsed.
 */
function toggleNavbarCorners() {
  let navbar = document.querySelector("nav");
  navbar.querySelector("button.navbar-toggler").addEventListener('click', () => {
    if (navbar.classList.contains("round-bottom-corners")) {
      navbar.classList.remove("round-bottom-corners");
    } else {
      navbar.classList.add("round-bottom-corners");
    }
  });
}

/**
 * Initialization function.
 */
(function () {
  buildNavBar();
  toggleNavbarCorners();
})();
