<template>
  <div class="api-read">
    <div class="disconnected" v-if="errors && errors.length">
      <p>Something went wrong...</p>
    </div>
    <div class="connected" v-else>
      <div v-for="record in records" :key="record.id">
        <p class="quote" v-if="record.fields.Quote">{{ record.fields.Quote }}</p>
        <p class="quote" v-else>Intentionally Left Blank</p>
        <small class="name" v-if="record.fields.Name">{{ record.fields.Name }}</small>
        <small class="name" v-else>Anonymous</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ApiRead",
  data() {
    return {
      records: [],
      errors: []
    };
  },
  mounted() {
    axios({
      url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
      headers: {
        Authorization: "Bearer " + process.env.VUE_APP_API_KEY
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
        this.errors.push(error);
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
.name {
  &::before {
    content: "- ";
  }
}
</style>
