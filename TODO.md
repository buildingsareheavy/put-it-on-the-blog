# TODO List

- [ ] Make quote input a textarea
- [ ] Hide ".html" extensions
- [ ] Do not allow only whitespace for submission

---

# Notes

The first day I was able to research enough about the Google Sheets API and used references like [this codepen](https://codepen.io/quinlo/pen/eQrRMM). I was actually really surprised that I was able to put enough javascript and use ES6 syntax to make it all function. I also redid the styling to make it match my aesthetic more. It is interesting to know how easy it is to allow a read-only API call for Sheets.

The second day was a lot shorter and was all about researching how to write to the Sheet. I ended up racking my brain about authentication and trying to set something up without OAuth2 to have to sign in to Google. I asked around and none of my friends knew either. Eventually I found [this article](https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175) entitled _"How to Submit an HTML Form to Google Sheets…without Google Forms"_. I feel kind of weird that I had to copy and paste code into the GoogleScript, but I suppose it's the same as using a small library to get the job done. I read the code and it was commented rather nicely.

Everything was coming up with `undefined` but I found [this gist](https://github.com/shaharyogev/post-google-sheets-form/blob/master/index.html) that unfortunately uses JQuery, but at least it works. I've been trying to refactor so I don't need to be dependent on JQuery but so far, I can't get past the `undefined` problem.
