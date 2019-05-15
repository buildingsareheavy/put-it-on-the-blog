<template>
  <div id="app">
    <nav id="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </nav>
    <div class="page">
      <h1>Put It On The Blog</h1>
      <div class="container">
        <transition name="fade" mode="out-in">
          <!-- More complex transitions found here: https://markus.oberlehner.net/blog/vue-router-page-transitions/ -->
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      prevHeight: 0
    };
  }
};
</script>

<style lang="scss">
//
// GLOBAL
//

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

body {
  color: $fontcolor;
  text-align: center;
}

img {
  max-width: 100%;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.container {
  margin: 0 auto;
  padding: 2rem;
  max-width: $width;
  background: $foreground;
  border: 1px solid $fontcolor;
  box-shadow: 0px 15px 0px 5px $fontcolor;
}

h1 {
  padding: 2rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Cardo", serif;
}

p,
span,
a,
label,
input,
button {
  font-family: "Karla", sans-serif;
}

a {
  color: $fontcolor;
}

//
// NAVIGATION
//
nav {
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  li {
    list-style: none;
    text-align: right;
    a {
      text-transform: lowercase;
      text-decoration: none;
      &:hover {
        text-decoration: line-through;
      }
    }
  }
}

@media screen and (max-width: $width) {
  nav {
    background: $foreground;
    width: 100%;
    padding: 1rem 0;
    right: 0; //reset
    top: 0; // reset
    box-shadow: 0px 2px 10px 0px $fontcolor;
    li {
      display: inline;

      a {
        margin: 1rem;
      }
    }
  }
  h1 {
    margin-top: 5rem;
  }
}
</style>
