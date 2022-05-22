import request from "./request";

export default async function paperDetail(
  testId: number
): Promise<Result<{ mocPaperDto: MocPaperDto }>> {
  const res = await request({
    url: "/api/mob/course/paperDetail/v1",
    method: "POST",
    params: {
      testId,
      isExercise: true,
      withStdAnswerAndAnalyse: true,
    },
  });

  return res.data;
}
