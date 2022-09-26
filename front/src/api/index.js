import axios from "axios";

const config = {
  baseUrl: "http://localhost:5001/api/space/",
};

// function fectchSpaceList(id) {
//   return axios.get(`${config.baseUrl}/space/${id}.json`);
// }

function fectchMarkersSpace() {
  return axios.get(`${config.baseUrl}`);
}

function createMarker(fd) {
  return axios.post(`${config.baseUrl}`, fd);
}

function deleteMarker(id) {
  return axios.delete(`${config.baseUrl}delete/${id}`);
}

function editMarker(fd) {
  return axios.post(`${config.baseUrl}edit/${fd.id}`, fd);
}

export { fectchMarkersSpace, createMarker, deleteMarker, editMarker };
