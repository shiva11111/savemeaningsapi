<template>
  <div class="container">
    <div class="row justify-content-center bg-light p-2">
      <form>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="word"
        />
        <br />
        <button
          @click.prevent="search('google')"
          class="btn btn-success my-2 my-sm-0 mr-2"
          type="submit"
        >
          Google Search
        </button>
        <button
          @click.prevent="search('oxford')"
          class="btn btn-success my-2 my-sm-0"
          type="submit"
        >
          Oxford Search
        </button>
      </form>
    </div>
    <div class="container" v-if="meaning.word">
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">word: {{ meaning.word }}</li>
          <li class="list-group-item">
            definitions: {{ meaning.definitions }}
          </li>
          <li class="list-group-item">examples: {{ meaning.examples }}</li>
          <li class="list-group-item">synonyms: {{ meaning.synonyms }}</li>
        </ul>
      </div>
      <h4 v-if="exists">Meaning already saved</h4>
      <button v-else class="btn btn-success" @click.prevent="saveMeaning">
        save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      meaning: {},
      word: "",
      exists: false,
    };
  },
  methods: {
    async searchDB() {
      await this.axios
        .get("https://savemeaning-api.herokuapp.com/get/" + this.word)
        .then((r) => {
          if (r.data.length > 0) {
            this.exists = true;
          } else {
            this.exists = false;
          }
        })
        .catch(() => {
          this.exists = false;
        });
    },
    search(option) {
      let uri =
        "https://savemeaning-api.herokuapp.com/" + option + "/" + this.word;
      this.searchDB();
      this.axios
        .get(uri)
        .then((res) => {
          this.meaning = {};
          this.meaning.definitions = [];
          this.meaning.examples = [];
          this.meaning.synonyms = [];
          if (option == "google") this.setGoogleMeaning(res);
          else this.setOxfordMeaning(res);
        })
        .catch(() => {
          this.meaning = {};
          this.meaning = { "not found": "Can not find the meaning " };
        });
    },
    setGoogleMeaning(res) {
      let result = res.data[0].meanings[0].definitions;
      this.meaning.word = res.data[0].word;
      for (let i in result) {
        this.meaning.definitions.push(result[i].definition);
        this.meaning.examples.push(result[i].example);
        if (result[i].synonyms)
          this.meaning.synonyms = [
            ...this.meaning.synonyms,
            ...result[i].synonyms,
          ];
      }
    },
    setOxfordMeaning(res) {
      let result = res.data.results[0];
      this.meaning.word = result.id;
      result = result.lexicalEntries[0].entries[0].senses[0];
      this.meaning.definitions.push(result.definitions[0]);
      for (let i in result.examples) {
        this.meaning.examples.push(result.examples[i].text);
      }
      for (let i in result.synonyms) {
        this.meaning.synonyms.push(result.synonyms[i].text);
      }
    },
    saveMeaning() {
      this.axios
        .post("https://savemeaning-api.herokuapp.com/save", this.meaning)
        .then(() => {
          console.log("meaning added");
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
};
</script>
