import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:5001/api/space",
  });

  return setInterceptors(instance);
}

const instance = createInstance();

function fectchMarkersSpace() {
  return instance.get("/");
}

function createMarker(fd) {
  return instance.post("/", fd);
}

function deleteMarker(id) {
  return instance.delete(`delete/${id}`);
}

function editMarker(fd) {
  return instance.post(`edit/${fd.id}`, fd);
}

export { fectchMarkersSpace, createMarker, deleteMarker, editMarker };
