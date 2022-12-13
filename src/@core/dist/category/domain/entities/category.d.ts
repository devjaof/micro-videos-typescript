import Entity from '#seedwork/domain/entity/entity';
import UniqueEntityId from '#seedwork/domain/valueObjects/uniqueEntityIdVo';
export type CategoryProperties = {
    title: string;
    active?: boolean;
    description?: string;
    createdAt?: Date;
};
export declare class Category extends Entity<CategoryProperties> {
    readonly props: CategoryProperties;
    constructor(props: CategoryProperties, id?: UniqueEntityId);
    get title(): string;
    get description(): string;
    get active(): boolean;
    get createdAt(): Date;
    private set title(value);
    private set description(value);
    private set active(value);
    update(title?: string, description?: string): void;
    activate(): void;
    deactivate(): void;
    static validate(props: CategoryProperties): void;
}
