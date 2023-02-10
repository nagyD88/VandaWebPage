import { QuestionType } from './QuestionType';

export interface QuestionnaireType {
  id: number;
  Title: string;
  Questions: QuestionType[];
}
