<template lang="pug">
  table
    thead
      tr
        td(@click="sort('id')")
          | #
          span(:class="{ asc: sortType === 'asc' }" v-if="sortBy == 'id'")
        td(@click="sort('word')")
          | Слово
          span(:class="{ asc: sortType === 'asc' }" v-if="sortBy == 'word'")
        td(@click="sort('time')")
          | Время
          span(:class="{ asc: sortType === 'asc' }" v-if="sortBy == 'time'")
    tbody
      tr(v-for="(result) in sortedResults" :key="result.id ")
        td {{ result.id }}
        td {{ result.word }}
        td {{ result.time | humanReadableTime }}
</template>

<script>
export default {
  created() {
    this.results = this.$store.getters.results;
  },
  data() {
    return {
      sortBy: 'id',
      sortType: 'asc',
      results: [],
    };
  },
  methods: {
    sort(sortField) {
      this.sortBy = sortField;
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    },
  },
  computed: {
    sortedResults() {
      const copy = [...this.results];
      return copy.sort((a, b) => {
        let modifier = 1;
        if (this.sortType === 'desc') {
          modifier = -1;
        }
        if (a[this.sortBy] > b[this.sortBy]) {
          return 1 * modifier;
        }
        return -1 * modifier;
      });
    },
  },
  filters: {
    humanReadableTime(time) {
      const seconds = time % 60 > 10 ? time % 60 : `0${time % 60}`;
      const minutes = Math.floor(time / 60) > 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
      return `${minutes}:${seconds}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
table {
  font-size: 26px;
  color: #ffffff;
  background-color: $green-light;
  border-collapse: collapse;
  width: 500px;
  border: 3px solid $bg-color;
  margin: 150px auto;
  thead {
    border: 3px solid $bg-color;
    td {
      padding: 5px;
      border-right: none;
      border-left: none;
      span {
        margin-left: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        background-image: url('../assets/arrow.png');
        background-size: cover;
        width: 10px;
        height: 10px;
        display: inline-block;
        transform: rotate(180deg);
      }
      .asc {
        transform: rotate(0);
      }
      &:first-child {
        text-align: center;
        padding: 5px;
      }
      &:hover {
        cursor: pointer;
        color: #b6b6b6;
      }
    }
  }
  tbody tr td {
    padding: 5px;
    border: none;
    &:first-child {
      text-align: center;
    }
  }
}
@media screen and (max-width: 720px) {
  table {
    width: 320px;
    font-size: 18px;
  }
}
</style>
