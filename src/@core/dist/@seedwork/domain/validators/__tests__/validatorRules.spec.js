"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const validatorRules_1 = require("#seedwork/domain/validators/validatorRules");
function assertIsInvalid({ value, property, rule, error, params = [], }) {
    expect(() => {
        const validator = validatorRules_1.default.values(value, property);
        const method = validator[rule];
        method.apply(validator, params);
    }).toThrow(error);
}
function assertIsValid({ value, property, rule, error, params = [], }) {
    expect(() => {
        const validator = validatorRules_1.default.values(value, property);
        const method = validator[rule];
        method.apply(validator, params);
    }).not.toThrow(error);
}
describe('ValidatorRules Unit Tests', () => {
    test('values method', () => {
        const validator = validatorRules_1.default.values('Drama', 'Category');
        expect(validator).toBeInstanceOf(validatorRules_1.default);
        expect(validator['value']).toBe('Drama');
        expect(validator['property']).toBe('Category');
    });
    it('should throw error when required rule is violeted', () => {
        const arrange = [
            { value: '', property: 'Category', },
            { value: null, property: 'Category' },
            { value: undefined, property: 'Category' },
            { value: 0, property: 'Category' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "required",
                error: "The Category is required."
            });
        });
    });
    it('should throw error when value isnt a string', () => {
        const arrange = [
            { value: 5, property: 'Category' },
            { value: { maluco: 'sim' }, property: 'Category' },
            { value: true, property: 'Category' },
            { value: new Date(), property: 'Category' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "string",
                error: "The Category must be a string."
            });
        });
    });
    it('should throw error when value is over the max-length rule', () => {
        const arrange = [
            { value: 'aadssaaaasdasdasad', property: 'Category' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error: "The Category is over the max-length.",
                params: [10]
            });
        });
    });
    it('should throw error when value is not a boolean', () => {
        const arrange = [
            { value: 'true', property: 'active' },
            { value: 5, property: 'active' },
            { value: new Date(), property: 'active' }
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error: "The active must be a boolean."
            });
        });
    });
    it('should not throw required rule error', () => {
        const arrange = [
            { value: 'Filme', property: 'Category', }
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "required",
                error: new class_validator_1.ValidationError()
            });
        });
    });
    it('should not throw string rule error', () => {
        const arrange = [
            { value: 'Filme', property: 'Category' },
            { value: undefined, property: 'Category' },
            { value: null, property: 'Category' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "string",
                error: new class_validator_1.ValidationError()
            });
        });
    });
    it('should not throw maxLength rule error', () => {
        const arrange = [
            { value: 'Filme', property: 'Category' },
            { value: undefined, property: 'Category' },
            { value: null, property: 'Category' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error: new class_validator_1.ValidationError(),
                params: [10]
            });
        });
    });
    it('should not throw boolean rule error', () => {
        const arrange = [
            { value: true, property: 'active' },
            { value: null, property: 'active' },
            { value: undefined, property: 'active' }
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error: new class_validator_1.ValidationError(),
            });
        });
    });
    it('should throw error when two or more rules are combined', () => {
        let validator = validatorRules_1.default.values(null, 'field');
        expect(() => {
            validator.required().string();
        }).toThrow('The field is required.');
        validator = validatorRules_1.default.values(6, 'field');
        expect(() => {
            validator.required().string();
        }).toThrow('The field must be a string.');
        validator = validatorRules_1.default.values('aqui tem mais de 15 caracteres com certeza', 'field');
        expect(() => {
            validator.required().string().maxLength(15);
        }).toThrow('The field is over the max-length.');
        validator = validatorRules_1.default.values(undefined, 'field');
        expect(() => {
            validator.required().boolean();
        }).toThrow('The field is required.');
        validator = validatorRules_1.default.values('true', 'field');
        expect(() => {
            validator.required().boolean();
        }).toThrow('The field must be a boolean.');
    });
});
