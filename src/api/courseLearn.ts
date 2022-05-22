import request from "./request";

const courseLearn = async (
  cid: number,
  tid: number
): Promise<Result<{ termDto: { chapters: Chapter[] } }>> => {
  const res = await request({
    url: "/api/mob/course/courseLearn/v1",
    method: "POST",
    params: {
      cid,
      tid,
    },
  });
  return res.data;
};

export default courseLearn;
