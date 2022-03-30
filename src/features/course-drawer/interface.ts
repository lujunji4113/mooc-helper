export interface Course {
  id: number;
  currentTermId: number;
  name: string;
  imgUrl: string;
  schoolPanel: {
    name: string;
  };
}
