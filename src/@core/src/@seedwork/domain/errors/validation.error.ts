import { FieldErrors } from "../validators/validatorFieldsInterface";

export class ValidationError extends Error {
};

export class EntityValidationError extends Error {
  constructor(public error: FieldErrors){
    super('Entity validation error');
    this.name = "EntityValidationError";
  }
}