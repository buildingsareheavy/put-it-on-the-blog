//
// Google Script
//

fetch(
  "https://script.google.com/macros/s/AKfycbwti_ReoJGQ6nqd_QbEVNxNlmFhKxLD4G_hItvCYVw3m_oLS7E/exec"
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error(`Error: ${error}`));
