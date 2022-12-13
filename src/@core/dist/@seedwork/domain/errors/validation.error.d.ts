import { FieldErrors } from "#seedwork/domain/validators/validatorFieldsInterface";
export declare class ValidationError extends Error {
}
export declare class EntityValidationError extends Error {
    error: FieldErrors;
    constructor(error: FieldErrors);
}
