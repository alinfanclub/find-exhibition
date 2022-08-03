import { fectchSpaceList } from "@/api/index";

export default {
  FETCH_DATA({ commit }, pageName) {
    fectchSpaceList(pageName)
      .then(({ data }) => commit("SET_SPACE", data))
      .catch((error) => console.log(error));
  },
};
