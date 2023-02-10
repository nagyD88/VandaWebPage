import { LevelType } from './LevelType';

export interface EducationMaterialtype {
  id: number;
  name: string;
  type: string;
  content: string;
  level: LevelType;
  index: number;
}
