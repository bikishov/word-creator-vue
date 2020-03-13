<template lang="pug">
  div
    div(v-if="!loading")
      .container(v-if="!isEndGame")
        img.image(:src="image" :alt="currentWord")
        ul.letters__wrap
          li.letter(v-for="(letter, i) in shuffleWord" :key="i" @click="checkLetter(letter, i)")
            | {{ letter }}
        word(:currentWord="currentWord" :guessedWord="guessed")
        button.clear(@click="resetWord") Сбросить
      w-table(v-else)
    div(v-else="")
      loader
    modal(v-if="confirmModal" @confirm="continueGame" @cancel="endGame")
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import shuffleWords from 'shuffle-words';
import Modal from '@/components/Modal.vue';
import Loader from '@/components/Loader.vue';
import Word from '@/components/Word.vue';
import WTable from '@/components/W-Table.vue';
import image from '@/assets/mock.png';

export default {
  components: {
    Modal,
    Loader,
    Word,
    WTable,
  },
  beforeMount() {
    this.getWord();
  },
  data() {
    return {
      guessed: '',
      image: '',
      time: 0,
      shuffleWord: [],
      loading: true,
      timer: null,
      confirmModal: false,
      isEndGame: false,
    };
  },
  methods: {
    async getWord() {
      const random = Math.floor(Math.random() * 1368) + 2;
      const res = await axios.get(
        `https://apidir.pfdo.ru/v1/directory-program-activities/${random}`,
      );
      if (res.data.result_code === 'FLSCS') {
        this.$store.dispatch('setCurrentWord', res.data.data.name);
        this.image = res.data.data.img_src || image;
        this.shuffleWord = shuffleWords(this.currentWord.toUpperCase(), true).split('');
        this.shuffleWord = this.shuffleWord.filter((el) => el !== ' ');
        this.loading = false;
        this.timer = setInterval(() => {
          this.time += 1;
        }, 1000);
      } else {
        this.getWord();
      }
    },
    checkLetter(letter, index) {
      if (this.currentWord[this.guessed.length].toUpperCase() === letter) {
        this.guessed += letter;
        this.shuffleWord.splice(index, 1);

        if (this.guessed === this.currentWord.toUpperCase()) {
          const result = {
            word: this.currentWord,
            time: this.time,
          };
          this.$store.dispatch('addResult', result);
          this.guessed = '';
          this.time = 0;
          this.loading = true;
          this.confirmModal = true;
          clearTimeout(this.timer);
          this.getWord();
        }
      }
      if (this.currentWord[this.guessed.length] === ' ') {
        this.guessed += ' ';
      }
    },
    endGame() {
      this.isEndGame = true;
      this.confirmModal = false;
    },
    continueGame() {
      this.confirmModal = false;
    },
    resetWord() {
      this.guessed = '';
      this.shuffleWord = shuffleWords(this.currentWord.toUpperCase(), true).split('');
      this.shuffleWord = this.shuffleWord.filter((el) => el !== ' ');
    },
  },
  computed: {
    ...mapGetters(['currentWord']),
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

body {
  background-color: $bg-color;
}
.container {
  border: 2px solid #008cff;
  border-radius: 5px;
  background-color: #ffffff66;
  width: 720px;
  margin: 0 auto;
  padding: 5px;
}
.image {
  display: block;
  width: 300px;
  height: 300px;
  margin: 5px auto 10px;
  object-fit: fill;
  border-radius: 5px;
}
.letters__wrap {
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.letter {
  border-radius: 5px;
  background-color: #008cff;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  line-height: 40px;
  width: 40px;
  height: 40px;
  margin: 2px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
    // animation: 0.1s shake;
    // animation-delay: 0.1s;
  }
}
.clear {
  display: block;
  margin: 10px auto;
  width: 150px;
  text-align: center;
  height: 30px;
  font-size: 18px;
  border: none;
  color: rgb(255, 255, 255);
  background-color: #f35588;
  border-radius: 5px;
}
@media screen and (max-width: 1280px) {
  .container {
    width: 600px;
  }
}
@media screen and (max-width: 720px) {
  .container {
    width: 90%;
  }
}
</style>
