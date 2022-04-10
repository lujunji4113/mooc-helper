import axios from "axios";

const instance = axios.create({
  baseURL: "https://qckftx.api.cloudendpoint.cn",
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "mob-token": localStorage.getItem("mob-token") ?? "",
  };
  return config;
});

export const getCourseList = async (
  _key: string,
  page: number,
  pageSize: number
) => {
  const res = await instance({
    url: "/getCourseList",
    method: "GET",
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
};
