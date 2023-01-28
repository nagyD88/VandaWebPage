import { Questionnaire } from "./Questionaire";
import { MeetingLog } from "./MeetingLog";
import { Level } from "./Level";

export interface User{
    id: number;
    lastName: string;
    firstName: string;
    admin: Boolean;
    email: string;
    reasonForApplication: string;
    directInquiry: Boolean;
    communication: string;
    questionnaires: Questionnaire[];
    mbti:string;
    price:number;
    numberOfDetailsStart:number;
    meetingLogs: MeetingLog[];
    numberOfDetailsLeft:number;
    priceLeft:number;
    passwordHash:string;
    passwordSalt:string;
    refreshTokenID:number;
    refreshToken:string|null;
    tokenCreated: string;
    tokenExpires:string;
    levels: Level[];
  }