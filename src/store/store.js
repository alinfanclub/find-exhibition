import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import positions from "./positions";
export default createStore({
  state: {
    mainLocation: {
      lat: 35.17977666295549,
      lng: 129.07488498030014,
    },
    positions,
    setLevel: 5,
    viewLevel: 10,
    spaceData: [],
    closeBtn: false,
    localIconShow: true,
  },
  actions,
  mutations,
  getters,
  modules: {},
});
