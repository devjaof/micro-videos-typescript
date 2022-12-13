"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classValidatorFields_1 = require("#seedwork/domain/validators/classValidatorFields");
const libClassValidator = require("class-validator");
class StubClassValidator extends classValidatorFields_1.default {
}
describe('ClassValidatorFields unit tests', () => {
    it('should start all errors and validatedData variables null', () => {
        const validator = new StubClassValidator();
        expect(validator.errors).toBeNull;
        expect(validator.validatedData).toBeNull;
    });
    it('should validate with errors', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([
            { property: 'field', constraints: { isRequired: 'some error' } }
        ]);
        const validator = new StubClassValidator();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({ field: ["some error"] });
    });
    it('should validate without errors', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([]);
        const validator = new StubClassValidator();
        expect(validator.validate({ field: 'value' })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: 'value' });
        expect(validator.errors).toBeNull();
    });
});
