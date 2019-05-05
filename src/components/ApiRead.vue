<template>
  <div class="api-read">
    <div v-for="record in records" :key="record.id">
      <p class="quote">{{ record.fields.Quote }}-</p>
      <small>{{ record.fields.Name }}</small>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";

export default {
  name: "ApiRead",
  props: {
    msg: String
  },
  data() {
    return {
      records: []
    };
  },
  mounted() {
    axios({
      // eslint-disable-next-line
      url: process.env.API_URL + process.env.API_SUFFIX,
      headers: {
        // eslint-disable-next-line
        Authorization: "Bearer " + process.env.API_KEY
      },
      params: {
        sortField: "Name",
        sortDirection: "asc"
      }
    })
      .then(response => {
        this.records = response.data.records;
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log("Damn! " + error);
      });
  },
  created() {
    console.log("API_URL is: " + API_URL);
    console.log("env.API_URL is: " + env.API_URL);
    console.log("process.env.API_URL is: " + process.env.API_URL);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.quote {
  &::before,
  &::after {
    content: '"';
  }
}
</style>
