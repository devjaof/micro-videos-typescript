"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// VO -> Value Object
const invalidUuid_error_1 = require("../errors/invalidUuid.error");
const uuid_1 = require("uuid");
const valueObject_1 = require("./valueObject");
class UniqueEntityId extends valueObject_1.default {
    constructor(id) {
        super(id || (0, uuid_1.v4)());
        this.id = id;
        this.validate();
    }
    validate() {
        const isValid = (0, uuid_1.validate)(this.value);
        if (!isValid) {
            throw new invalidUuid_error_1.default();
        }
    }
}
exports.default = UniqueEntityId;
