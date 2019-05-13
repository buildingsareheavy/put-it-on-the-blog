<template>
  <div>
    <div>
      <button @click="postQuote">Post new entry</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "post",
  methods: {
    postQuote() {
      return axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_API_KEY
        },
        data: {
          fields: {
            Name: "Ethan",
            Quote: "Hey! I can post!"
          }
        }
      })
        .then(function(response) {
          console.log("yay");
          console.log(response);
        })
        .catch(function(error) {
          console.log("nope");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
button {
  text-transform: uppercase;
  font-size: 2rem;
  margin: 1rem;
}
</style>
