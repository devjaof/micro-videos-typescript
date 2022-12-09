import { EntityValidationError } from "#seedwork/domain/errors/validation.error";
import ClassValidatorFields from "#seedwork/domain/validators/classValidatorFields"
import { FieldErrors } from "#seedwork/domain/validators/validatorFieldsInterface"

type Expected = {validator: ClassValidatorFields<any>, data: any} | (() => any);

expect.extend({
  toContainErrorMessages(expected: Expected, received: FieldErrors) {
    if(typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessages(error.error, received);
      }
    } else {
      const {validator, data} = expected;
      const validate = validator.validate(data);
    
      if(validate) {
        return isValid();
      }

      return assertContainsErrorMessages(validator.errors, received);
    }
  }
})

function isValid() {
  return {
    pass: false,
    message: () => "The data is valid"
  }
}

function assertContainsErrorMessages(expected: FieldErrors ,received: FieldErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch ? 
  { pass: true, message: () => "" } :
  {
    pass: false, 
    message: () => `Does not contain ${JSON.stringify(received)}. Current error is: ${JSON.stringify(expected)}`
  };
}
