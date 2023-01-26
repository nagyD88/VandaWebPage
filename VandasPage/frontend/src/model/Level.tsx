import { EducationMaterial } from "./EducationMaterial";
import { User } from "./User";

export interface Level {
    id: number;
    Name: string;
    Index:number;
    users: User[];
    educationalMaterials:EducationMaterial[];
  }