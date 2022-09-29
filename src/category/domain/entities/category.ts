export type CategoryProperties = {
 title: String;
 active: Boolean;
 description?: String;
 createdAt?: Date;
}

export class Category {
  constructor (public readonly props: CategoryProperties){
    this.description = this.props.description;
    this.props.createdAt = this.props.createdAt ?? new Date();
  };

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: String) {
    this.props.description = value ?? null;
  }

  get active() {
    return this.props.active;
  }

  private set active(value: Boolean) {
    this.props.active = value ?? true;
  }

  get createdAt() {
    return this.props.createdAt ?? new Date();;
  }
}
