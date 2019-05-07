<template>
  <footer id="footer">
    <p>
      &copy;
      {{ new Date().getFullYear() + " -" }}
      <a
        href="https://buildingsareheavy.com"
      >Buildings Are Heavy.</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#footer {
  max-width: calc(#{$width} + 2rem + 12px);
  margin: -5px auto 2rem auto;
  background: $fontcolor;
  padding: 1rem;
  @media screen and (max-width: calc(#{$width} + 4rem + 24px)) {
    margin: -5px;
  }
  p,
  a {
    color: $foreground;
    text-decoration: none;
  }
}
</style>
