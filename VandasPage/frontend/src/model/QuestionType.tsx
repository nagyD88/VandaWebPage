import { QuestionnaireType } from './QuestionaireType';

export interface QuestionType {
  id: number;
  QuestionAsk: string;
  AnswerOptions: number[];
  Answer: number;
  Index: number;
  Questionnaire: QuestionnaireType;
}
