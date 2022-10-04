export type CategoryProperties = {
 title: string;
 active?: boolean;
 description?: string;
 createdAt?: Date;
}

export class Category {
  constructor (public readonly props: CategoryProperties){
    this.description = this.props.description;
    this.props.active = this.props.active ?? true; 
    this.props.createdAt = this.props.createdAt ?? new Date();

  }

  get title() {
    return this.props.title;
  }

  get description() { 
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get active() {
    return this.props.active;
  }

  private set active(value: boolean) {
    this.props.active = value ?? true;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
