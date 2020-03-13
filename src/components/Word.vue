<template lang="pug">
  div
    .guessed-word
      span.guessed-letter(:class="{ break: letter == ' ' }" v-for="(letter, i) in word" :key="i")
        | {{ letter }}
</template>

<script>
export default {
  props: { currentWord: String, guessedWord: String },
  computed: {
    word() {
      const newWord = Array(this.currentWord.length);
      this.currentWord.split('').forEach((letter, index) => {
        if (this.currentWord[index].toUpperCase() === this.guessedWord[index]) {
          newWord[index] = letter.toUpperCase();
        } else if (this.currentWord[index] === ' ') {
          newWord[index] = ' ';
        } else {
          newWord[index] = '';
        }
      });
      return newWord;
    },
  },
};
</script>

<style lang="scss" scoped>
.guessed-word {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.guessed-letter {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-bottom: 2px solid #008cff;
  font-size: 28px;
  text-align: center;
  margin: 10px 2px 0px 2px;
}
.break {
  flex-basis: 100%;
  height: 0 !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0 !important;
}

@media screen and (max-width: 720px) {
  .guessed-letter {
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #008cff;
    font-size: 18px;
    text-align: center;
    margin: 30px 1px 40px 1px;
    padding-bottom: 5px;
  }
}
</style>
