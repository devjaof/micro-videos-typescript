"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUuidError extends Error {
    constructor(message) {
        super(message || 'Id must be a valid UUID');
        this.name = 'Invalid UUID';
    }
}
exports.default = InvalidUuidError;
