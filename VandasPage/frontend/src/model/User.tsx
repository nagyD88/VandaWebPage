import { Questionnaire } from "./Questionaire";
import { MeetingLog } from "./MeetingLog";
import { Level } from "./Level";

export interface User{
    id: number;
    LastName: string;
    FirstName: string;
    Admin: Boolean;
    Email: string;
    ReasonForApplication: string;
    DirectInquiry: Boolean;
    Communication: string;
    _questionnaires: Questionnaire[];
    MBTI:string;
    Price:number;
    NumberOfDetailsStart:number;
    MeetingLogs: MeetingLog[];
    NumberOfDetailsLeft:number;
    priceLeft:number;
    PasswordHash:string;
    PasswordSalt:string;
    RefreshTokenID:number;
    RefreshToken:string|null;
    TokenCreated: string;
    TokenExpires:string;
    Levels: Level[];
  }