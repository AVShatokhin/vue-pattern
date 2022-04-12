/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frontConfig: {
      avatars_base_url: "",
    },
    menuItems: [],
    userData: {
      uid: 0,
      confirmd: 0,
      blocked: 0,
      roles: [],
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
    updateFrontConfig(state, frontConfig) {
      state.frontConfig = frontConfig;
    },
    updateMenuItems(state, menuItems) {
      state.menuItems = menuItems;
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
      if (state.userData.extended?.ava_url ? false : true) {
        return "./pattern_img/noava.png";
      } else {
        try {
          let url = new URL(state.userData.extended?.ava_url);
          if (url.protocol == "data:") {
            return state.userData.extended?.ava_url;
          }
        } catch {
          return (
            state.frontConfig.avatars_base_url +
            "/" +
            state.userData.extended?.ava_url
          );
        }
      }
    },
    menuItems(state) {
      return state.menuItems;
    },
    no_ava(state) {
      return state.userData.extended?.ava_url ? false : true;
    },
  },
});
