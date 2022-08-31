import { fectchSpaceList, fectchMarkersSpace } from "@/api/index";

export default {
  FETCH_DATA({ commit }, pageName) {
    fectchSpaceList(pageName)
      .then(({ data }) => commit("SET_SPACE", data))
      .catch((error) => console.log(error));
  },
  FETCH_MARKERS_SPACE({ commit }) {
    fectchMarkersSpace()
      .then(({ data }) => commit("SET_M_SPACE", data))
      .catch((error) => console.log(error));
  },
};
