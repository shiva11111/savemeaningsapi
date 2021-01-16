<template>
  <div class="list-group">
    <!-- <div
      class="container list-group-item list-group-item-action"
      v-for="word in all"
      v-bind:key="word.id"
    >
      <div>
        <h5>Word:</h5>
        <h5>{{ word.word }}</h5>
      </div>
      <h5>Meanings:</h5>
      <p class="mb-1" v-for="def in word.definitions" v-bind:key="def.index">
        {{ def }}
      </p>
      <h5>Examples:</h5>
      <p
        class="mb-1"
        v-for="example in word.examples"
        v-bind:key="example.index"
      >
        {{ example }}
      </p>
      <h5>Synonyms:</h5>
      <p class="mb-1" v-for="syn in word.synonyms" v-bind:key="syn.index">
        {{ syn }}
      </p>
    </div> -->
    <!-- </div> -->
    <div class="card mb-4" v-for="word in all" v-bind:key="word.id">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">word: {{ word.word }}</li>
        <li class="list-group-item">definitions: {{ word.definitions }}</li>
        <li class="list-group-item">examples: {{ word.examples }}</li>
        <li class="list-group-item">synonyms: {{ word.synonyms }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      all: [],
    };
  },
  async mounted() {
    let returnVal = await this.axios.get(
      "https://savemeaning-api.herokuapp.com/all"
    );
    console.log(returnVal.data);

    this.all = returnVal.data;
  },
};
</script>
