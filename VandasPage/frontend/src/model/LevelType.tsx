import { EducationMaterialtype } from './EducationMaterialType';
import { UserType } from './UserType';

export interface LevelType {
  id: number;
  name: string;
  index: number;
  users: UserType[];
  educationalMaterials: EducationMaterialtype[];
}
