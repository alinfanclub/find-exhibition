import axios from "axios";

const config = {
  baseUrl: "https://alinfanclub.github.io/findExhibitionData/",
};

function fectchSpaceList(id) {
  return axios.get(`${config.baseUrl}/space/${id}.json`);
}

export { fectchSpaceList };
