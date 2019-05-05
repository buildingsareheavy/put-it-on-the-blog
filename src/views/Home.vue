<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ApiRead></ApiRead>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiRead from "@/components/ApiRead.vue";

export default {
  name: "home",
  components: {
    ApiRead
  }
};
</script>
