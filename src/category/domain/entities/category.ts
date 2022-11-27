import { EntityValidationError } from '../../../@seedwork/domain/errors/validation.error';
import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/valueObjects/uniqueEntityIdVo';
import CategoryValidatorFactory from '../validators/category.validator';

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
    Category.validate({
      title: props.title, 
      description: props.description,
      active: props.active
    });

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

  update(title?: string, description?: string) {
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

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);

    if(!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
