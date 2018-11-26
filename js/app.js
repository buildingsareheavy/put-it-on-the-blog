fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1rmcpC1s-oKdzlh3CEgDTrmTYv2Xlk1S9XbRGWZuEB3M/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA0OjajGZQT0ybehn5xbSfwalZnxVT4bjQ"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    var postArray = data.values;

    // Not sure if I'm supposed to do this all within "then", but it's not working outside of "fetch"
    var postItem = document.createElement("p");
    var postContainer = document.getElementById("posts");
    // Everything is going into the same p tag, not it's own
    // Also need to create a div foreach and put that p tag into it
    postContainer.appendChild(postItem);

    // forEach for each column
    postArray.forEach(function(column) {
      name = column[0];
      text = column[1];

      // Display name
      var postName = document.createTextNode(name);
      postItem.appendChild(postName);

      // Display text
      var postText = document.createTextNode(text);
      postItem.appendChild(postText);

      console.log(name + " >> " + text);
    }); // end of nameArray.forEach
  }) // end of then
  .catch(err => {
    // Do something for an error here
  });
