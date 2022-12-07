"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const invalidUuid_error_1 = require("../errors/invalidUuid.error");
const uniqueEntityIdVo_1 = require("./uniqueEntityIdVo");
function spyValidateMethod() {
    return jest.spyOn(uniqueEntityIdVo_1.default.prototype, 'validate');
}
describe("UniqueEntityId unity tests", () => {
    const spyOnValidate = spyValidateMethod();
    // beforeEach(() => {
    // jest.clearAllMocks();
    // });
    it('should throw an InvalidUuidError when uuid is invalid', () => {
        // const spyOnValidate = spyValidateMethod()
        expect(() => new uniqueEntityIdVo_1.default('fake id')).toThrow(new invalidUuid_error_1.default());
        expect(spyOnValidate).toHaveBeenCalled();
    });
    it('should accept a validated uuid passed in constructor', () => {
        // const spyOnValidate = spyValidateMethod()
        // vo -> value object
        const vo = new uniqueEntityIdVo_1.default('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');
        expect(vo.value).toBe('258d4d87-c57d-4ec5-81d9-6fbb9fc73929');
        expect(spyOnValidate).toHaveBeenCalled();
    });
    it('should accept a validated not implicit uuid ', () => {
        // const spyOnValidate = spyValidateMethod()
        // vo -> value object
        const vo = new uniqueEntityIdVo_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(spyOnValidate).toHaveBeenCalled();
    });
});
