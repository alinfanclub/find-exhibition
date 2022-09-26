import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import positions from "./positions";
import cafePositions from "./cafePositions";
export default createStore({
  state: {
    mainLocation: {
      lat: 35.13369297982537,
      lng: 129.05257320182452,
    },
    positions,
    cafePositions,
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
  },
  actions,
  mutations,
  getters,
  modules: {},
});
