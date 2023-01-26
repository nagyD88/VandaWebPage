import { Question } from "./Question";


export interface Questionnaire {
    id: number;
    Title: string;
    Questions: Question[];
  }