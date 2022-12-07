import { FieldErrors } from "../validators/validatorFieldsInterface";
export declare class ValidationError extends Error {
}
export declare class EntityValidationError extends Error {
    error: FieldErrors;
    constructor(error: FieldErrors);
}
