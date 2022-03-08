/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {
      uid: 0,
      confirmd: 0,
      blocked: 0,
      role: "",
      email: "",
      token: "",
      extended: {
        name: "",
        secondName: "",
        phone: "",
        position: "",
      },
    },
  },
  mutations: {
    updateUserData(state, userData) {
      state.userData = userData;
    },
    deleteAva(state) {
      let tmp = state.userData.extended;
      delete tmp["ava_url"];
      state.userData.extended = { ...tmp };
    },
    updateAva(state, newAva) {
      let tmp = state.userData.extended;
      delete tmp["ava_url"];
      tmp.ava_url = newAva;
      state.userData.extended = { ...tmp };
    },
  },
  actions: {},
  getters: {
    ava_url(state) {
      return state.userData.extended?.ava_url || "./pattern_img/noava.png";
    },
    no_ava(state) {
      return state.userData.extended?.ava_url ? false : true;
    },
  },
});
