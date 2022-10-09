import request from "@/lib/request";

export const courseList = async (page: number, pageSize: number) =>
  request<Result<{ pagination: Pagination; result: Course[] }>>({
    url: "mob/course/getAllMyCourseList/v2",
    method: "POST",
    query: {
      p: page,
      psize: pageSize,
      type: 30,
    },
  });

export const courseInfo = async (courseId: number, currentTermId: number) =>
  request<Result<{ termDto: { chapters: Chapter[] } }>>({
    url: "mob/course/courseLearn/v1",
    method: "POST",
    query: {
      cid: courseId,
      tid: currentTermId,
    },
  });

export const homework = async (currentTermId: number) =>
  request<Result<{ mocPaperDto: MocPaperDto }>>({
    url: "mob/course/homeworkPaperDto/v1",
    method: "POST",
    query: {
      tid: currentTermId,
    },
  });

export const test = async (testId: number) =>
  request<Result<{ mocPaperDto: MocPaperDto }>>({
    url: "mob/course/paperDetail/v1",
    method: "POST",
    query: {
      testId,
      isExercise: true,
      withStdAnswerAndAnalyse: true,
    },
  });
