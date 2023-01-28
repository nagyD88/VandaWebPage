import { EducationMaterial } from "./EducationMaterial";
import { User } from "./User";

export interface Level {
    id: number;
    name: string;
    index:number;
    users: User[];
    educationalMaterials:EducationMaterial[];
  }