import { v4 as uuid } from 'uuid';

export type CategoryProperties = {
 title: string;
 active?: boolean;
 description?: string;
 createdAt?: Date;
}

export class Category {

  public readonly id: string;
  constructor (public readonly props: CategoryProperties, id?: string){
    this.id = id || uuid();
    this.props.description = this.props.description ?? null;
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
  private set description(value: string) {
    this.props.description = value ?? null;
  }

  private set active(value: boolean) {
    this.props.active = value ?? true;
  }
}

// TODO: anotar explicação sobre objeto de valor


