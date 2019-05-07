<template>
  <div id="posts">
    <div v-for="record in records" :key="record.id">
      <p class="quote" v-if="record.fields.Quote">{{ record.fields.Quote }}</p>
      <p class="quote" v-else>Intentionally Left Blank</p>
      <p class="name" v-if="record.fields.Name">{{ record.fields.Name }}</p>
      <p class="name" v-else>Anonymous</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      records: "",
      errors: []
    };
  },
  beforeCreate() {
    document.body.className = "body-home";
  },
  created() {
    this.loadQuotes();
  },
  methods: {
    loadQuotes() {
      axios({
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
        headers: {
          Authorization: "Bearer " + process.env.VUE_APP_API_KEY
        },
        params: {
          sortField: "Name",
          sortDirection: "asc",
          maxRecords: "3"
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
  }
};
</script>

<style lang="scss">
.body-home {
  background: gold;
}
#posts {
  div {
    border-bottom: 1px solid $fontcolor;
    margin: 1rem 0;
    padding: 3rem 2rem 2rem 2rem;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    transition: all 0.6s;
    @media screen and (max-width: $width) {
      padding: 1.5rem 2rem 2rem 2rem; // reset
    }
    &:last-of-type {
      border-bottom: none;
    }
    .name {
      text-align: right;
      &::before {
        content: "- ";
      }
    }
    .quote {
      text-align: center;
      font-style: italic;
      &::after,
      &::before {
        content: '"';
      }
    }
  }
}
</style>
