"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
expect.extend({
    toContainErrorMessages(expected, received) {
        if (typeof expected === 'function') {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContainsErrorMessages(error.error, received);
            }
        }
        else {
            const { validator, data } = expected;
            const validate = validator.validate(data);
            if (validate) {
                return isValid();
            }
            return assertContainsErrorMessages(validator.errors, received);
        }
    }
});
function isValid() {
    return {
        pass: false,
        message: () => "The data is valid"
    };
}
function assertContainsErrorMessages(expected, received) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    return isMatch ?
        { pass: true, message: () => "" } :
        {
            pass: false,
            message: () => `Does not contain ${JSON.stringify(received)}. Current error is: ${JSON.stringify(expected)}`
        };
}
