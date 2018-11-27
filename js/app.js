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

//
// Start Google Sheets API
// Only needed on index.html, no need to load on other pages
//

fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1rmcpC1s-oKdzlh3CEgDTrmTYv2Xlk1S9XbRGWZuEB3M/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA0OjajGZQT0ybehn5xbSfwalZnxVT4bjQ"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // reverse order so new posts show on top
    const postArray = data.values.reverse();

    function addPost(addName, addText) {
      const mainContainer = document.getElementById("posts");
      const postContainer = document.createElement("div");
      const postName = document.createElement("p");
      const postText = document.createElement("p");

      // Add class to each p tag
      postName.classList.add("post-name");
      postText.classList.add("post-text");

      postName.innerText = addName;
      postText.innerText = addText;
      mainContainer.appendChild(postContainer).appendChild(postText);
      mainContainer.appendChild(postContainer).appendChild(postName);
    }

    // forEach for each column
    postArray.forEach(function(column) {
      name = column[0];
      text = column[1];

      if (text == undefined) {
        text = "Intentionally left blank.";
      }

      if (name == "") {
        name = "Anonymous";
      }

      // Display name and text
      addPost(name, text);
    }); // end of nameArray.forEach
  }) // end of then
  .catch(err => {
    // Do something for an error here
  });

//
// Google Script
//

fetch(
  "https://script.google.com/macros/s/AKfycbwti_ReoJGQ6nqd_QbEVNxNlmFhKxLD4G_hItvCYVw3m_oLS7E/exec"
)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(error => console.error(`Error: ${error}`));
