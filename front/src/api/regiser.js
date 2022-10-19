import axios from "axios";

const config = {
  baseUrl: "http://localhost:5001/user/",
};

function register() {
  return axios.post(`${config.baseUrl}singup`);
}

function login(data) {
  return axios.post(`${config.baseUrl}login`, data);
}

export { register, login };
