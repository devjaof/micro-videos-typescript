"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const validation_error_1 = require("@seedwork/domain/errors/validation.error");
const entity_1 = require("@seedwork/domain/entity/entity");
const category_validator_1 = require("../validators/category.validator");
class Category extends entity_1.default {
    constructor(props, id) {
        var _a, _b, _c;
        // antes de passar as propriedades:
        // validar objeto na íntegra, objetos filhos, e validação adiada ou deferida
        Category.validate({
            title: props.title,
            description: props.description,
            active: props.active
        });
        super(props, id);
        this.props = props;
        this.description = (_a = this.props.description) !== null && _a !== void 0 ? _a : null;
        this.props.active = (_b = this.props.active) !== null && _b !== void 0 ? _b : true;
        this.props.createdAt = (_c = this.props.createdAt) !== null && _c !== void 0 ? _c : new Date();
    }
    // getters
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get active() {
        return this.props.active;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    // setters
    set title(value) {
        this.props.title = value !== null && value !== void 0 ? value : null;
    }
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    set active(value) {
        this.props.active = value !== null && value !== void 0 ? value : true;
    }
    update(title, description) {
        Category.validate({
            title,
            description
        });
        this.title = title;
        this.description = description;
    }
    activate() {
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
    // deprecated:
    // static validate(props: CategoryProperties) {
    //   ValidatorRules.values(props.title, 'title').required().string().maxLength(250);
    //   ValidatorRules.values(props.description, 'description').string();
    //   ValidatorRules.values(props.active, 'active').boolean();
    // }  
    static validate(props) {
        const validator = category_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new validation_error_1.EntityValidationError(validator.errors);
        }
    }
}
exports.Category = Category;
