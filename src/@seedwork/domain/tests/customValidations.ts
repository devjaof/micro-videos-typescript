import ClassValidatorFields from "../validators/classValidatorFields"
import { FieldErrors } from "../validators/validatorFieldsInterface"

type Expected = {validator: ClassValidatorFields<any>, data: any}

expect.extend({
  toContainErrorMessages(expected: Expected, received: FieldErrors) {
    const {validator, data} = expected;
    const isValid = validator.validate(data);
    
    if(isValid) {
      return {
        pass: false, 
        message: () => 'The data is valid'
      }
    }

    const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors);

    return isMatch ? 
    { pass: true, message: () => "" } :
    {
      pass: false, 
      message: () => `Does not contain ${JSON.stringify(received)}. Current error is: ${JSON.stringify(validator.errors)}`
    };
  }
})