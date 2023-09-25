import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
export default createStore({
  state: {
    mainLocation: {
      lat: 35.13369297982537,
      lng: 129.05257320182452,
    },
    setLevel: 10,
    viewLevel: 7,
    spaceData: [],
    closeBtn: false,
    localIconShow: true,
    cafeLocalIconShow: true,
    searchBar: false,
    menuActive: false,
    clickLocation: "",
    markersSpace: [],
    isOK: false,
    token: "",
  },
  actions,
  mutations,
  getters,
  modules: {},
});
