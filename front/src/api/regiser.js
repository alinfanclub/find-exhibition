import axios from "axios";

function createInstance() {
  return axios.create({
    baseURL: "http://localhost:5001/user/",
  });
}

const instance = createInstance();

function register() {
  return instance.post("singup");
}

function login(data) {
  return instance.post("login", data);
}

export { register, login };
