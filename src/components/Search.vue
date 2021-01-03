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
      <button class="btn btn-success">save</button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      meaning: {},
      word: "",
    };
  },
  methods: {
    search(option) {
      let uri = "http://localhost:4000/word/" + option + "/" + this.word;
      this.axios
        .get(uri)
        .then((res) => {
          this.meaning = {};
          this.meaning.definitions = [];
          this.meaning.examples = [];
          this.meaning.synonyms = [];
          if (option == "google") this.setGoogleMeaning(res);
          else this.setOxfordMeaning(res);
          console.log(this.meaning);
        })
        .catch(() => {
          this.meaning = {};
          this.meaning = { "not found": "Can not find the meaning " };
          console.log(this.meaning["not found"]);
        });
    },
    setGoogleMeaning(res) {
      let result = res.data[0].meanings[0].definitions;
      this.meaning.word = res.data[0].word;
      for (let i in result) {
        this.meaning.definitions.push(result[i].definition);
        this.meaning.examples.push(result[i].example);
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
      console.log(result.definitions);
      this.meaning.definitions.push(result.definitions[0]);
      for (let i in result.examples) {
        this.meaning.examples.push(result.examples[i].text);
      }
      for (let i in result.synonyms) {
        this.meaning.synonyms.push(result.synonyms[i].text);
      }
    },
  },
};
</script>
