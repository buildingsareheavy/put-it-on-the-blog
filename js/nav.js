//
// Start Navigation
//

const navArray = ["index", "about", "submit"];

function addNav(linkText, linkHref) {
  const navContainer = document.getElementById("mainNav");
  const navLink = document.createElement("a");
  const navItem = document.createElement("li");
  navLink.text = linkText;
  navLink.href = linkHref;

  navContainer.appendChild(navItem).appendChild(navLink);
}

navArray.forEach(function(navItem) {
  text = navItem;
  href = "./" + navItem + ".html";

  addNav(text, href);
});
