import { Questionnaire } from "./Questionaire";

export interface Question {
    id: number;
    QuestionAsk : string;
    AnswerOptions: number [];
    Answer: number;
    Index: number
    Questionnaire: Questionnaire
  }