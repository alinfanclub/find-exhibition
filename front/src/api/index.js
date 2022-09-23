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

function createMarker(data) {
  return axios.post(`${config.baseUrl}`, data);
}

function deleteMarker(id) {
  return axios.delete(`${config.baseUrl}delete/${id}`);
}

function editMarker(id, data) {
  return axios.post(`${config.baseUrl}edit/${id}`, data);
}

export { fectchMarkersSpace, createMarker, deleteMarker, editMarker };
