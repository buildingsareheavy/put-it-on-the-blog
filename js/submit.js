// Reference: https://github.com/shaharyogev/post-google-sheets-form/blob/master/index.html

// This all needs
$(document).ready(function() {
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    return o;
  };
  var form = $("form#test-form"),
    url =
      "https://script.google.com/macros/s/AKfycbwti_ReoJGQ6nqd_QbEVNxNlmFhKxLD4G_hItvCYVw3m_oLS7E/exec";
  form.submit(function(e) {
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: form.serializeObject()
    });
    $(".thanks p").html(
      "<p>Thank you for contributing! 🌈</p><p>It has been added to the <a href='./index.html'>blog</a>.</p>"
    );
    $(".form-group").remove();
    $("#submit").remove();
  });
});
