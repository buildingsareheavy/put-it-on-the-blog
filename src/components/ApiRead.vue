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
      url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
      headers: {
        // eslint-disable-next-line
        Authorization: "Bearer " + process.env.VUE_APP_API_KEY
      },
      params: {
        sortField: "Name",
        sortDirection: "asc"
      }
    })
      .then(response => {
        this.records = response.data.records;
        console.log(process.env.VUE_APP_API_URL);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log("Damn! " + error);
        console.log("URL is: " + process.env.VUE_APP_API_URL);
      });
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
