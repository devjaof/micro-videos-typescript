import ValidatorFieldInterface from "../../../@seedwork/validators/validatorFieldsInterface";
import ClassValidatorFields from "../../../@seedwork/validators/classValidatorFields";
import { CategoryProperties } from "../entities/category";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CategoryRules {
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({title, description, active, createdAt}: CategoryProperties) {
    Object.assign(this, {title, description, active, createdAt});
  }
}

export class CategoryValidator
  extends ClassValidatorFields<CategoryRules> 
  implements ValidatorFieldInterface<CategoryRules> {
    validate(data: CategoryProperties): boolean {
      return super.validate(new CategoryRules(data ?? {} as any));
    }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}