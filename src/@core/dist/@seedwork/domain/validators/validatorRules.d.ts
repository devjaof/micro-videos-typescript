export default class ValidatorRules {
    private value;
    private property;
    private constructor();
    static values(value: any, property: string): ValidatorRules;
    required(): this;
    string(): this;
    maxLength(max: number): this;
    boolean(): typeof this;
}
export declare function isEmpty(value: any): boolean;
