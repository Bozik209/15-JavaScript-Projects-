// slice extracts a section of a string without modifying original string

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // one way :
  // linksContainer.classList.toggle("show-links")

  // dynamic way for the buttons
  // Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linkHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linkHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});
// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  // pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
  // console.log(window.pageYOffset);
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  // console.log(links);
  link.addEventListener("click", function name(e) {
    // prevent default
    // The preventDefault() method cancels the event if it is cancelable
    e.preventDefault();
    // navigate to specific spot
    // The getAttribute() method returns the value of the attribute with the specified name, of an element.
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    //offsetTop - A Number, representing the top position of the element, in pixels
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }

    if (containerHeight > 82) {
      position = position + containerHeight;
        
    }
    console.log(position);
    window.scrollTo({ left: 0, top: position });
    linksContainer.style.height = 0;
  });
});
