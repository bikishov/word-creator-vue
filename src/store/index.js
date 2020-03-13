import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    currentWord: '',
    id: 1,
  },
  getters: {
    results: (state) => state.results,
    currentWord: (state) => state.currentWord,
  },
  mutations: {
    ADD_RESULT(state, word) {
      const result = {
        ...word,
      };
      result.id = state.id;
      state.id += 1;
      state.results.push(result);
    },
    SET_CURRENT_WORD(state, word) {
      state.currentWord = word;
    },
  },
  actions: {
    addResult({
      commit,
    }, word) {
      commit('ADD_RESULT', word);
    },
    setCurrentWord({
      commit,
    }, word) {
      commit('SET_CURRENT_WORD', word);
    },
    incrementId({
      commit,
    }) {
      commit('INCREMENT_ID');
    },
  },
  modules: {},
});
