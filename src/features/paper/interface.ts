export interface OptionDto {
  id: string;
  answer: boolean;
  content: string;
}

export interface Question {
  id: string;
  type: 1 | 2 | 3 | 4;
  title: string;
}

export interface SingleChoiceQuestion extends Question {
  type: 1 | 4;
  optionDtos: OptionDto[];
}

export interface MultipleChoiceQuestion extends Question {
  type: 2;
  optionDtos: OptionDto[];
}

export interface CompletionQuestion extends Question {
  type: 3;
  stdAnswer: string;
}
