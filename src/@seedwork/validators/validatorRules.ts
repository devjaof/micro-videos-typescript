import ValidationError from "../errors/validation.error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}
  
  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }
  
  required(): this {
    if(!this.value || this.value === 0) {
      throw new ValidationError(`The ${this.property} is required.`);
    }
    return this;
  }

  string(): this {
    if(typeof this.value != 'string') {
      throw new ValidationError(`The ${this.property} must be a string.`);
    }
    return this;
  }

  maxLength(max: number): this {
    if(this.value.length > max) {
      throw new ValidationError(`The ${this.property} is over the max-length.`);
    }
    return this;
  }
}

ValidatorRules.values('xpto', 'title').required().string().maxLength(255);