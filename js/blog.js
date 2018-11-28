//
// Start Google Sheets API
// Only needed on index.html, no need to load on other pages
//

// Call function outside of fetch, so it can be used for then and catch
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

fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1rmcpC1s-oKdzlh3CEgDTrmTYv2Xlk1S9XbRGWZuEB3M/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA0OjajGZQT0ybehn5xbSfwalZnxVT4bjQ"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // reverse order so new posts show on top
    const postArray = data.values.reverse();

    // forEach for each column
    postArray.forEach(function(column) {
      name = column[0];
      text = column[1];

      // If text is blank
      if (text == undefined) {
        text = "Intentionally left blank.";
      }

      // If name is blank
      if (name == "") {
        name = "Anonymous";
      }

      // Skip name_field and text_field row
      if (name == "name_field" || text == "text_field") {
        return;
      }

      // Display name and text
      addPost(name, text);
    }); // end of nameArray.forEach
  }) // end of then
  .catch(err => {
    addPost("Also, there was an error", "This page intentionally left blank.");
    console.error("Error: ", error);
  });
