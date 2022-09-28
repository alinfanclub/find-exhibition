import axios from "axios";

const config = {
  baseUrl: "http://localhost:5001/api/",
};

function register() {
    return axios.post(`${config.baseUrl}` + signup);
  }

export { register };