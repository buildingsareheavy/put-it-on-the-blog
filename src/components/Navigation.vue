<template>
  <nav id="nav">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/about">About</router-link>
    </li>
  </nav>
</template>

<script>
export default {
  name: "navigation"
};
</script>

<style lang="scss">
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
    z-index: 1; // was going under 'add post' button
    box-shadow: 0px 2px 10px 0px $fontcolor;
    li {
      display: inline;

      a {
        margin: 1rem;
      }
    }
  }
}
</style>