"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUuidError extends Error {
    constructor(message) {
        // o super chama o construtor do extends -> Error
        super(message || 'Id must be a valid UUID');
        this.name = 'Invalid UUID';
    }
}
exports.default = InvalidUuidError;
