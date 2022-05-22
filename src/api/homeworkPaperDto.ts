import request from "./request";

export default async function homeworkPaperDto(
  tid: number
): Promise<Result<{ mocPaperDto: MocPaperDto }>> {
  const res = await request({
    url: "/api/mob/course/homeworkPaperDto/v1",
    method: "POST",
    params: {
      tid,
    },
  });
  return res.data;
}
