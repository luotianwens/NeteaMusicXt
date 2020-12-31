import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isShowLogin: false,
  user: null,
  SongList: null,
  uid: null,
  cookie: '',
  playlist: [],
  artist: null,
  isLoading: false,
};

export default new Vuex.Store({
  state,
  mutations: {
    addPlayList(state, list) {
      state.playlist = list;
    },
    showLogin(state) {
      state.isShowLogin = true;
    },
    showLoading(state) {
      state.isLoading = true;
    },
    hiddenLogin(state) {
      state.isShowLogin = false;
    },
    hiddenLoading(state) {
      state.isLoading = false;
    },
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;
    },
    addArtist(state, obj) {
      state.artist = obj;
    },
  },
  getters: {
    getShowLogin(state) {
      return state.isShowLogin;
    },
  },
  actions: {},
  modules: {},
});
