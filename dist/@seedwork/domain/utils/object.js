"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
function deepFreeze(obj) {
    const props = Object.getOwnPropertyNames(obj);
    for (const name of props) {
        const value = obj[name];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}
exports.deepFreeze = deepFreeze;
