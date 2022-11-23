interface Result<T extends any> {
  status: { code: number; message: string };
  results: T;
}

interface Pagination {
  totlePageCount: number;
}

interface Course {
  id: number;
  currentTermId: number;
  name: string;
  imgUrl: string;
  fromCourseId: number;
  schoolPanel: SchoolPanel;
  termPanel: {
    id: number;
  };
}

interface SchoolPanel {
  name: string;
}

interface Chapter {
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
  exam: {
    objectTestVo: {
      id: number;
      name: string;
    };
    subjectTestVo: {
      id: number;
      name: string;
    };
  };
}

interface Content {
  contentId: number;
  contentType: number;
  name: string;
}

interface Homework extends Content {}

interface Quiz extends Content {}

interface ObjectiveQ {
  id: number;
  type: number;
  title: string;
  optionDtos: {
    id: string;
    answer: boolean;
    content: string;
  }[];
  stdAnswer: string;
}

interface SubjectiveQ {
  id: number;
  type: number;
  title: string;
  judgeDtos: {
    id: number;
    msg: string;
  }[];
}

interface MocPaperDto {
  objectiveQList: ObjectiveQ[];
  subjectiveQList: SubjectiveQ[];
}
