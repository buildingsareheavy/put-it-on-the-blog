<template>
  <div id="posts" :class="{ 'get-quotes-failed' : getQuotesFailed }">
    <div class="post-button active" v-if="postButtonActive == true">
      <p class="post-quote-failed" v-if="postButtonFailedMessage">Uh oh... Something went wrong.</p>
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
      <button class="post-button-cancel" @click="postCancel">Cancel</button>
      <button class="post-button-submit" @click="postQuotes">Submit</button>
    </div>
    <div class="post-button" v-else>
      <button class="post-button-add" @click.prevent="postAdd" v-show="!getQuotesFailed">Add Post</button>
    </div>
    <p v-if="getQuotesFailed">Uh oh... Looks like something isn't loading right now.</p>
    <transition-group name="records">
      <div v-for="record in records" :key="record.id">
        <p class="quote" v-if="record.fields.Quote">{{ record.fields.Quote }}</p>
        <p class="quote" v-else>Intentionally Left Blank</p>
        <p class="name" v-if="record.fields.Name">{{ record.fields.Name }}</p>
        <p class="name" v-else>Anonymous</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      records: "",
      postButtonActive: false,
      postButtonFailedMessage: false,
      postName: "",
      postQuote: "",
      getQuotesFailed: false
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
          filterByFormula: "=NOT({Hide}, '')" // IF({Hide}, "false" || "") doesn't work, so must use NOT instead.
        }
      })
        .then(response => {
          this.records = response.data.records;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("GET: " + error);
          this.getQuotesFailed = true;
          // console.log(this.getQuotesFailed);
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
          // eslint-disable-next-line
          console.log(response);
          this.getQuotes();
          this.postButtonActive = false;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("POST: " + error);
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
//
// START of #posts
//
#posts {
  min-height: 100vh; // So it doesn't flash super short for a second.
  &.get-quotes-failed {
    min-height: inherit;
    p {
      padding: 3rem 0;
    }
  }
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
  }
  //
  // START of .post-button
  //
  .post-button {
    padding: 0;
    margin-bottom: -1rem;
    border-bottom: none;
    button {
      &.post-button-add {
        margin-bottom: 1.5rem;
      }
      border: none;
      margin: 0 0 -3rem 0;
      background: lighten($fontcolor, 2);
      color: $foreground;
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
        background: lighten($fontcolor, 17);
      }
      &.post-button-cancel {
        background: $cancelcolor;
        color: $fontcolor;
        &:hover {
          background: lighten($cancelcolor, 8);
        }
      }
    }
    //
    // START .post-button.active
    //
    &.active {
      margin: 1rem 0;
      padding: 1.5rem 2rem 2rem 2rem;
      border-bottom: 1px solid $fontcolor;
      @media screen and (max-width: $width) {
        padding: 0.25rem 2rem 1rem 2rem; // reset
      }
      button {
        margin: 0 1rem;
        border-radius: 20px 20px 0 0;
        transform: translateY(2rem);
        @media screen and (max-width: $width) {
          transform: translateY(1rem); // reset
          margin: 0 0.25rem;
          margin-top: 0.5rem;
        }
      }
    }
  } // END OF .post-button
}
//
// END of #posts
//
input {
  transition: all 0.4s;
  border: none;
  border-bottom: 1px solid transparent;
  font-size: 1rem;
  text-align: center;
  &:focus {
    border-bottom: 1px solid $fontcolor;
  }
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
.post-quote-failed {
  text-align: center;
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
// <transition-group name="records">
.records-enter {
  opacity: 0;
  transform: translateY(40px);
}
</style>
