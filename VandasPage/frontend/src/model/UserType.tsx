import { QuestionnaireType } from './QuestionaireType';
import { MeetingLogType } from './MeetingLogType';
import { LevelType } from './LevelType';

export interface UserType {
  id: number;
  lastName: string;
  firstName: string;
  admin: Boolean;
  email: string;
  reasonForApplication: string;
  directInquiry: Boolean;
  communication: string;
  questionnaires: QuestionnaireType[];
  mbti: string;
  price: number;
  numberOfDetailsStart: number;
  meetingLogs: MeetingLogType[];
  numberOfDetailsLeft: number;
  priceLeft: number;
  passwordHash: string;
  passwordSalt: string;
  refreshTokenID: number;
  refreshToken: string | null;
  tokenCreated: string;
  tokenExpires: string;
  levels: LevelType[];
}
