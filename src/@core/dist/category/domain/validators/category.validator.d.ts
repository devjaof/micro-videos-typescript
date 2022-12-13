import ValidatorFieldInterface from "#seedwork/domain/validators/validatorFieldsInterface";
import ClassValidatorFields from "#seedwork/domain/validators/classValidatorFields";
import { CategoryProperties } from "#category/domain/entities/category";
export declare class CategoryRules {
    title: string;
    description: string;
    active: boolean;
    createdAt: Date;
    constructor({ title, description, active, createdAt }: CategoryProperties);
}
export declare class CategoryValidator extends ClassValidatorFields<CategoryRules> implements ValidatorFieldInterface<CategoryRules> {
    validate(data: CategoryProperties): boolean;
}
export default class CategoryValidatorFactory {
    static create(): CategoryValidator;
}
