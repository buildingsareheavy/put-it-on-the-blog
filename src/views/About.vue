<template>
  <div>
    <div id="bio">
      <div>
        <p>
          My friend Ginnia and I have an ongoing joke when we text each other:
          "put it on the blog!" But we never actually had a blog to write to.
          I wanted something quick and easy where anyone could easily post and
          not have to worry about logins or managing a database.
        </p>
        <p>
          Then my friend
          <a href="https://rodrigo-ibarra.com/" target="_blank" rel="noopener">Rodrigo</a>
          mentioned I could just use a spreadsheet to manage all the blog
          content, and I was like 🤦🏻‍♂️.
        </p>
        <p>
          You can view the spreadsheet
          <a
            href="https://airtable.com/shrGRqevisz7iepJT"
            target="_blank"
            rel="noopener"
          >here</a>
          and can submit to the blog
          <router-link to="/">here</router-link>.
        </p>
      </div>
      <img src="@/assets/besties.jpg" alt="Ethan and Ginnia are excited about thier new blog!" />
    </div>
    <div id="bio-more">
      <p>My name is Ethan Bradford Barrett Villarreal.</p>
      <p>
        You can find more of what I do at
        <a
          href="https://buildingsareheavy.com"
          target="_blank"
          rel="noopener"
        >BuildingsAreHeavy.com</a>,
        <a
          href="https://www.instagram.com/buildingsareheavy/"
          target="_blank"
          rel="noopener"
        >Instagram</a>
        or
        <a
          href="https://github.com/buildingsareheavy"
          target="_blank"
          rel="noopener"
        >Github</a>.
      </p>
      <p>
        This project is written in
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a>, hosted on
        <a href="http://netlify.com/" target="_blank" rel="noopener">Netlify</a>, utilizes
        the
        <a
          href="https://airtable.com/api/"
          target="_blank"
          rel="noopener"
        >Airtable API</a>, and uses Google Fonts
        <a
          href="https://fonts.google.com/specimen/Cardo"
          target="_blank"
          rel="noopener"
        >Cardo</a>
        and
        <a
          href="https://fonts.google.com/specimen/Karla"
          target="_blank"
          rel="noopener"
        >Karla</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  beforeCreate: function() {
    document.body.className = "body-about";
  }
};
</script>

<style lang="scss">
.body-about {
  background: pink;
}
#bio {
  background: $foreground;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: $width) {
    display: block;
    padding-top: 0.25rem;
  }
  p {
    text-align: left;
    margin: 0.5rem 2rem 1.75rem 2rem;
  }
  img {
    max-width: 100%;
  }
}

#bio-more {
  border-top: 1px solid $fontcolor;
  background: $foreground;
  padding: 2rem;
  margin-top: 3rem;
}
</style>
