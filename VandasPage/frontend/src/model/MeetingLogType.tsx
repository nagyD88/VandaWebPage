import { UserType } from './UserType';
export interface MeetingLogType {
  id: number;
  meetCount: number;
  log: string;
  user: UserType;
}
