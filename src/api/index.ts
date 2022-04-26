import axios from "axios";

const instance = axios.create({
  baseURL: "https://qckftx.api.cloudendpoint.cn",
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "mob-token": localStorage.getItem("mob-token") ?? "",
  };
  return config;
});

export const getAllMyCourseList = async (page: number, pageSize: number) => {
  const res = await instance({
    method: "GET",
    url: "/getAllMyCourseList",
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
};
