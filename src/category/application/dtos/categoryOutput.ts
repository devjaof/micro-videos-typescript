import { Category } from "category/domain/entities/category";

export type CategoryOutput = {
  id: string;
  title: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
}


export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON();
  }
}