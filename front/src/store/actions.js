import { fectchMarkersSpace } from "@/api/index";

export default {
  FETCH_MARKERS_SPACE({ commit }) {
    fectchMarkersSpace()
      .then(({ data }) => commit("SET_M_SPACE", data))
      .catch((error) => console.log(error));
  },
};
