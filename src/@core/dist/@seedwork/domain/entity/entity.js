"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueEntityIdVo_1 = require("#seedwork/domain/valueObjects/uniqueEntityIdVo");
class Entity {
    constructor(props, id) {
        this.props = props;
        this.UniqueEntityId = id || new uniqueEntityIdVo_1.default();
    }
    get id() {
        return this.UniqueEntityId.value;
    }
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.default = Entity;
