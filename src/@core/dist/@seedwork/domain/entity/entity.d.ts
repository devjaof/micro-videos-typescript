import UniqueEntityId from "#seedwork/domain/valueObjects/uniqueEntityIdVo";
export default abstract class Entity<Props = any> {
    readonly props: Props;
    readonly UniqueEntityId: UniqueEntityId;
    constructor(props: Props, id?: UniqueEntityId);
    get id(): string;
    toJSON(): Required<{
        id: string;
    } & Props>;
}
