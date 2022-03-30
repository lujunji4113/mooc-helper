export interface Homework {
  id: string;
  type: number;
  title: string;
  judgeDtos: JudgeDto[];
}

export interface JudgeDto {
  id: string;
  msg: string;
}
