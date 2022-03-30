export interface Chapter {
  id: number;
  name: string;
  homeworks: {
    contentId: number;
    name: string;
  }[];
  quizs: {
    contentId: number;
    name: string;
  }[];
}
