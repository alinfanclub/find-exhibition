import { createStore } from "vuex";

export default createStore({
  state: {
    mainLocation: {
      lat: 33.450701,
      lng: 126.570667,
      viewLevel: 2,
    },
    nowLocation: {
      lat: 0,
      lng: 0,
    },
    overlay: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
