import axios from "axios";

const instance = axios.create({
  // baseURL: "https://www.icourse163.org/mob/course",
  baseURL: "https://qckftx.api.cloudendpoint.cn",
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "mob-token": localStorage.getItem("mob-token") ?? "",
  };
  config.params = {
    ...config.params,
    "mob-token": localStorage.getItem("mob-token"),
  };
  return config;
});

export const getAllMyCourseList = async (page: number, pageSize: number) => {
  const res = await instance({
    // method: "POST",
    // url: "/getAllMyCourseList/v2",
    method: "GET",
    url: "/getAllMyCourseList",
    params: {
      page,
      pageSize,
      type: 30,
    },
  });

  return res.data;
};

export const courseLearn = async (courseId: number, termId: number) => {
  const res = await instance({
    method: "POST",
    url: "/courseLearn/v1",
    params: {
      cid: courseId,
      tid: termId,
    },
  });

  return res;
};

export const homeworkPaperDto = async (termId: number) => {
  const res = await instance({
    method: "POST",
    url: "/homeworkPaperDto/v1",
    params: {
      tid: termId,
    },
  });

  return res.data;
};

export const enroll = async (termId: number) => {
  const res = await instance({
    method: "POST",
    url: "/enroll/v1",
    params: {
      tid: termId,
    },
  });

  return res.data;
};

export const paperDetail = async (testId: number) => {
  const res = await instance({
    method: "POST",
    url: "/paperDetail/v1",
    params: {
      testId,
      isExercise: true,
      withStdAnswerAndAnalyse: true,
    },
  });

  return res.data;
};
