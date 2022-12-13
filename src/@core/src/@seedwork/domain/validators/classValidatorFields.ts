import { validateSync } from "class-validator";
import ValidatorFieldInterface, { FieldErrors } from "./validatorFieldsInterface";

export default abstract class ClassValidatorFields<PropsValidated> 
  implements ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors = null;
  validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);

    if(errors.length) {
      this.errors = {};

      errors.forEach((error) => {
        const field = error.property;

        this.errors[field] = Object.values(error.constraints);
      })
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}