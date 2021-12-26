
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener('click',function(){
    // classList - shows/gets all classes
    console.log(links.classList);
    // contains - checks classList for specific class
    console.log(links.classList.contains("random"));
    console.log(links.classList.contains("links"));

    // if (links.classList.contains("show-links")) {
    //     // remove - remove class
    //     links.classList.remove("show-links");
    // }else{
    //     // add - add class
    //     links.classList.add("show-links");
    // }
    
    // toggle - toggles class
    links.classList.toggle("show-links");
});