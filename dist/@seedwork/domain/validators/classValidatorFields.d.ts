import ValidatorFieldInterface, { FieldErrors } from "./validatorFieldsInterface";
export default abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldInterface<PropsValidated> {
    errors: FieldErrors;
    validatedData: PropsValidated;
    validate(data: any): boolean;
}
