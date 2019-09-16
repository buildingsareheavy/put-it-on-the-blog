<template>
  <div id="posts" :class="{ 'get-quotes-failed' : getPostsFailed }">
    <div class="post-button active" v-if="postButtonActive == true">
      <p v-if="errors" class="post-quote-failed">Oops! Between 3 and 255 characters please</p>
      <p
        v-else-if="formTouched && uiState === 'submit clicked'"
        class="post-quote-failed"
      >You can't submit a blank form</p>
      <p v-else-if="uiState === 'form submitted'" class="success">Hooray! Your form was submitted!</p>

      <p class="quote">
        <label for="postQuote">Quote</label>
        <input
          id="postQuote"
          v-model="$v.formResponses.postQuote.$model"
          type="text"
          name="quote"
          placeholder="Intentionally Left Blank"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Intentionally Left Blank'"
        />
      </p>
      <p class="name">
        <label for="postName">Name</label>
        <input
          id="postName"
          v-model="$v.formResponses.postName.$model"
          type="text"
          name="name"
          placeholder="Anonymous"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Anonymous'"
        />
      </p>
      <button class="post-button-cancel" @click="formCancel">Cancel</button>
      <button class="post-button-submit" @click.prevent="formSubmit">Submit</button>
    </div>
    <div class="post-button" v-else>
      <button class="post-button-add" @click.prevent="postAdd" v-show="!getPostsFailed">Add Post</button>
    </div>
    <p v-if="getPostsFailed">Uh oh... Looks like something isn't working ☹️</p>
    <transition-group name="records">
      <div v-for="record in records" :key="record.id">
        <p class="quote">{{ record.fields.Quote }}</p>
        <p class="name">{{ record.fields.Name }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Home",
  data() {
    return {
      records: [],
      postButtonActive: false,
      getPostsFailed: false,
      uiState: "submit not clicked",
      formTouched: false,
      errors: false,
      empty: true,
      formResponses: {
        postName: null,
        postQuote: null
      }
    };
  },
  validations: {
    formResponses: {
      postName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      postQuote: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      }
    }
  },
  beforeCreate() {
    document.body.className = "body-home";
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
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
          this.getPostsFailed = true;
        });
    },
    postAdd() {
      this.postButtonActive = true;
    },
    formCancel() {
      this.postButtonActive = false;
    },
    formSubmit() {
      this.formTouched = !this.$v.formResponses.$anyDirty;
      this.errors = this.$v.formResponses.$anyError;
      this.uiState = "submit clicked";
      if (this.errors === false && this.formTouched === false) {
        this.uiState = "form submitted";
        this.submitPosts();
      }
    },
    submitPosts() {
      return axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_SUFFIX,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.VUE_APP_API_KEY
        },
        data: {
          fields: {
            Name: this.formResponses.postName,
            Quote: this.formResponses.postQuote
          }
        }
      })
        .then(response => {
          // eslint-disable-next-line
          console.log(response);
          this.getPosts();
          this.postButtonActive = false;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("POST: " + error);
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
.name,
.quote {
  label {
    color: lighten($fontcolor, 50%);
    position: absolute;
    font-size: 0.85rem;
  }
}

.name {
  text-align: right;
  &::before {
    content: "- ";
  }
  label {
    transform: translate(4rem, 1.5rem);
    left: 70%;
    margin-left: -7.5rem;
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
  label {
    transform: translate(4rem, 1.5rem);
    left: 50%;
    margin-left: -5rem;
  }
  input {
    margin-left: 5px;
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
  margin-bottom: calc(-3.25rem + 1px);
  color: $foreground;
  display: absolute;
  transform: translateY(-4.5rem);
  background: linear-gradient(-45deg, tomato, deeppink, tomato);

  background-size: 500% 500%;
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
