<template>
  <div id="posts">
    <div class="post-button active" v-if="postButtonActive == true">
      <p class="failed" v-if="postButtonFailedMessage">Uh oh... Something went wrong.</p>
      <p class="quote">
        <input
          v-model="postQuote"
          type="text"
          name="quote"
          placeholder="Intentionally Left Blank"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Intentionally Left Blank'"
        >
      </p>
      <p class="name">
        <input
          v-model="postName"
          type="text"
          name="name"
          placeholder="Anonymous"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Anonymous'"
        >
      </p>
      <button class="post-button-submit" @click="postQuotes">Submit</button>
      <button class="post-button-cancel" @click="postCancel">Cancel</button>
    </div>
    <div class="post-button" v-else>
      <button class="post-button-add" @click="postAdd">Add Post</button>
    </div>
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
      errors: [],
      postButtonActive: false,
      postButtonFailedMessage: false,
      postName: "",
      postQuote: ""
    };
  },
  beforeCreate() {
    document.body.className = "body-home";
  },
  created() {
    this.getQuotes();
  },
  methods: {
    getQuotes() {
      axios({
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
        headers: {
          Authorization: "Bearer " + process.env.VUE_APP_API_KEY
        },
        params: {
          sortField: "Time",
          sortDirection: "desc",
          maxRecords: "5"
        }
      })
        .then(response => {
          this.records = response.data.records;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    postAdd() {
      this.postButtonActive = true;
    },
    postCancel() {
      this.postButtonActive = false;
    },
    postQuotes() {
      return axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_API_KEY
        },
        data: {
          fields: {
            Name: this.postName,
            Quote: this.postQuote
          }
        }
      })
        .then(response => {
          console.log(response);
          this.getQuotes();
          this.postButtonActive = false;
        })
        .catch(error => {
          console.log(error);
          this.postButtonFailedMessage = true;
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
    transition: all 0.6s;
    @media screen and (max-width: $width) {
      padding: 1.5rem 2rem 2rem 2rem; // reset
    }
    &:first-of-type {
      margin-top: -1rem; //offset the Post button
    }
    &:last-of-type {
      border-bottom: none;
    }
    .name {
      text-align: right;
      &::before {
        content: "- ";
      }
      input {
        width: 10ch;
        &:focus {
          width: 15ch;
        }
      }
    }
    .quote {
      text-align: center;
      font-style: italic;
      &::after,
      &::before {
        content: '"';
      }
      input {
        margin-left: 4px;
        width: 18ch;
        &:focus {
          width: 80%;
        }
      }
    }
    .failed {
      text-align: center;
      background: salmon;
      font-weight: 800;
      border-radius: 0 0 20px 20px;
      padding: 1rem;
      margin: 0 auto;
      display: inline-block;
      transform: translateY(-4.5rem);
      background: linear-gradient(
        -45deg,
        hotpink,
        cyan,
        springgreen,
        yellow,
        orange,
        crimson
      );
      background-size: 400% 400%;
      animation: failedMessage 3s infinite;
      @media screen and (max-width: $width) {
        transform: translateY(-3.25rem);
      }
    }
    input {
      transition: width 0.4s;
      border: none;
      border-bottom: 1px solid transparent;
      &:focus {
        border-bottom: 1px solid #212121;
      }
    }
  }
  .post-button {
    padding: 0;
    margin-bottom: -1rem;
    border-bottom: none;
    &.active {
      margin: 1rem 0;
      padding: 1.5rem 2rem 2rem 2rem;
      @media screen and (max-width: $width) {
        padding: 0.25rem 2rem 1rem 2rem; // reset
        button {
          transform: translateY(2rem);
        }
      }
      border-bottom: 1px solid #212121;
      button {
        margin: 0 1rem;
        border-radius: 20px 20px 0 0;
        transform: translateY(2rem);
        @media screen and (max-width: $width) {
          transform: translateY(1rem);
        }
      }
      input {
        font-size: 1rem;
        text-align: center;
      }
    }
    button {
      border: none;
      outline: none;
      margin: 0 0 -3rem 0;
      background: lightblue;
      transform: translateX(0vw);
      transform: translateY(-1rem);
      border-radius: 0 0 20px 20px;
      font-size: 1rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
      transition: background 0.2s;
      &:hover {
        cursor: pointer;
        background: skyblue;
      }
      &:focus {
        outline: none;
      }
    }
    .post-button-cancel {
      background: salmon;

      &:hover {
        background: tomato;
      }
    }
    .post-button-submit {
      background: lightgreen;

      &:hover {
        background: palegreen;
      }
    }
  }
}
@keyframes failedMessage {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
