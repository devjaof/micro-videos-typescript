import ValueObject from './valueObject';
export default class UniqueEntityId extends ValueObject<string> {
    readonly id?: string;
    constructor(id?: string);
    private validate;
}
