import courseLearn from "./courseLearn";
import homeworkPaperDto from "./homeworkPaperDto";
import paperDetail from "./paperDetail";
import request from "./request";

export { courseLearn, homeworkPaperDto, paperDetail };

export async function getAllMyCourseList(
  p: number,
  psize: number
): Promise<Result<{ pagination: Pagination; result: Course[] }>> {
  const axiosResponse = await request({
    url: "/api/mob/course/getAllMyCourseList/v2",
    method: "POST",
    params: {
      p,
      psize,
      type: 30,
    },
  });
  return axiosResponse.data;
}
