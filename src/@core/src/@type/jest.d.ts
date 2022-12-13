import { FieldErrors } from "#seedwork/domain/validators/validatorFieldsInterface";

declare global {
  declare namespace jest {
    interface Matchers<R> {
      toContainErrorMessages: (received: FieldErrors) => R;
    }
  }
}

export {};