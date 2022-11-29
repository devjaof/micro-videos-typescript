import Entity from "../entity/entity";
import NotFoundError from "../errors/notFound.error";
import uniqueEntityIdVo from "../valueObjects/uniqueEntityIdVo";
import { RepositoryInterface } from "./repositoryContracts";

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | uniqueEntityIdVo): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    
    const index = this.items.findIndex(i => i.id === entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | uniqueEntityIdVo): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const index = this.items.findIndex(i => i.id === _id);
    this.items.splice(index, 1);
  }
  
  
  protected async _get(id: string): Promise<E> {
    const item = this.items.find(item => item.id === id);
    if(!item) {
      throw new NotFoundError(`Entity not found using id ${id}`);
    }
    return item;
  }
}