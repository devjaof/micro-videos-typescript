"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = require("./category.validator");
describe('CategoryValidator tests', () => {
    let validator;
    beforeEach(() => (validator = category_validator_1.default.create()));
    test('invalidation cases for title field', () => {
        const arrange = [
            { isValid: validator.validate({ title: null }), data: null },
            { isValid: validator.validate({ title: undefined }), data: undefined },
            { isValid: validator.validate({ title: '' }), data: '' },
            { isValid: validator.validate({ title: 5 }), data: 5 },
            { isValid: validator.validate({ title: "teste".repeat(256) }), data: "teste".repeat(256) },
        ];
        arrange.forEach((each) => {
            expect(each.isValid).toBeFalsy();
            expect({ validator, data: each.data }).toContainErrorMessages({
                title: [
                    'title should not be empty',
                    'title must be a string',
                    'title must be shorter than or equal to 256 characters'
                ]
            });
        });
    });
    test('validation cases', () => {
        const arrange = [
            { isValid: validator.validate({ title: "Filmes" }), data: "Filmes" },
        ];
        arrange.forEach((each) => {
            expect(each.isValid).toBeTruthy();
        });
    });
});
