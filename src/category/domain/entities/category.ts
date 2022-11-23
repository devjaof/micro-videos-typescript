import Entity from '../../../@seedwork/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/valueObjects/uniqueEntityIdVo';

export type CategoryProperties = {
 title: string;
 active?: boolean;
 description?: string;
 createdAt?: Date;
}

export class Category extends Entity<CategoryProperties> {
  constructor (public readonly props: CategoryProperties, id?: UniqueEntityId){
    // antes de passar as propriedades:
    // validar objeto na íntegra, objetos filhos, e validação adiada ou deferida
    // validatorRules.ts


    super(props, id);
    this.description = this.props.description ?? null;
    this.props.active = this.props.active ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
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
  private set title(value: string) {
    this.props.title = value ?? null;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  private set active(value: boolean) {
    this.props.active = value ?? true;
  }

  update(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
