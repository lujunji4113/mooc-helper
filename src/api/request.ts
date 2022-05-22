import axios from "axios";

const request = axios.create({
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    "mob-token": localStorage.getItem("mob-token") ?? "",
  };
  return config;
});

export default request;
