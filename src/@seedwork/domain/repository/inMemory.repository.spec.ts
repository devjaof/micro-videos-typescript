// como o repository é abstrato há de se criar um Stub

import Entity from "../entity/entity";
import NotFoundError from "../errors/notFound.error";
import UniqueEntityId from "../valueObjects/uniqueEntityIdVo";
import InMemoryRepository from "./inMemory.repository";

type StubEntityProps = {
  title: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity>{
}

describe('InMemoryRepository unit tests', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => repository = new StubInMemoryRepository());

  it('should insert a new entity', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  })

  it('should throw error when entity not found', async () => {
    // rejects -> pegar o erro da promisse
    expect(repository.findById('fake aidí')).rejects.toThrow(
      new NotFoundError(`Entity not found using id fake aidí`)
    )

    expect(repository.findById(new UniqueEntityId('258d4d87-c57d-4ec5-81d9-6fbb9fc73929')))
    .rejects.toThrow(
      new NotFoundError(`Entity not found using id 258d4d87-c57d-4ec5-81d9-6fbb9fc73929`)
    )
  })

  it('should find entity by its id', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.UniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  })

  it('should find all entities', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  })

  it('should throw error when updating a not found entity', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    // await repository.insert(entity);

    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.id}`)
    )
  })

  it('should throw error when deleting a not found entity', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    // await repository.insert(entity);

    expect(repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.id}`)
    )
  })

  it('should update an entity', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    await repository.insert(entity);

    const updatedEntity = new StubEntity({title: 'tchutchucão', price: -5}, entity.UniqueEntityId);

    await repository.update(updatedEntity);
    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({title: 'teste', price: 24});
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.UniqueEntityId);
    expect(repository.items).toHaveLength(0);
  })
})