<template>
  <div id="app">
    <Navigation />
    <div class="page">
      <h1>Put It On The Blog</h1>
      <div class="container">
        <transition name="fade" mode="out-in">
          <!-- More complex transitions found here: https://markus.oberlehner.net/blog/vue-router-page-transitions/ -->
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
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
  @media screen and (max-width: $width) {
    margin-top: 5rem; // for mobile navigation
  }
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
</style>
