fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1rmcpC1s-oKdzlh3CEgDTrmTYv2Xlk1S9XbRGWZuEB3M/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA0OjajGZQT0ybehn5xbSfwalZnxVT4bjQ"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    var postArray = data.values;

    function addPost(addName, addText) {
      var mainContainer = document.getElementById("posts");
      var postContainer = document.createElement("div");
      var postName = document.createElement("p");
      var postText = document.createElement("p");

      postName.innerText = addName;
      postText.innerText = addText;
      mainContainer
        .appendChild(postContainer)
        .appendChild(postName)
        .appendChild(postText);
    }

    // forEach for each column
    postArray.forEach(function(column) {
      name = column[0];
      text = column[1];

      // Display name and text
      addPost(name, text);
    }); // end of nameArray.forEach
  }) // end of then
  .catch(err => {
    // Do something for an error here
  });
