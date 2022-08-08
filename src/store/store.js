import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import positions from "./positions";
import cafePositions from "./cafePositions";
export default createStore({
  state: {
    mainLocation: {
      lat: 35.1775975996367,
      lng: 129.1154036580446,
    },
    positions,
    cafePositions,
    setLevel: 10,
    viewLevel: 5,
    spaceData: [],
    closeBtn: false,
    localIconShow: true,
    cafeLocalIconShow: true,
    searchBar: false,
    menuActive: false,
    lat: "",
    lon: "",
  },
  actions,
  mutations,
  getters,
  modules: {},
});
