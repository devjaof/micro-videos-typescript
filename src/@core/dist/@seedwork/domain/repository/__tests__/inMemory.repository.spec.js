"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("#seedwork/domain/entity/entity");
const notFound_error_1 = require("#seedwork/domain/errors/notFound.error");
const uniqueEntityIdVo_1 = require("#seedwork/domain/valueObjects/uniqueEntityIdVo");
const inMemory_repository_1 = require("../inMemory.repository");
class StubEntity extends entity_1.default {
}
class StubInMemoryRepository extends inMemory_repository_1.default {
}
describe('InMemoryRepository unit tests', () => {
    let repository;
    beforeEach(() => repository = new StubInMemoryRepository());
    it('should insert a new entity', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it('should throw error when entity not found', async () => {
        expect(repository.findById('fake aidí')).rejects.toThrow(new notFound_error_1.default(`Entity not found using id fake aidí`));
        expect(repository.findById(new uniqueEntityIdVo_1.default('258d4d87-c57d-4ec5-81d9-6fbb9fc73929')))
            .rejects.toThrow(new notFound_error_1.default(`Entity not found using id 258d4d87-c57d-4ec5-81d9-6fbb9fc73929`));
    });
    it('should find entity by its id', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        await repository.insert(entity);
        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
        entityFound = await repository.findById(entity.UniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
    it('should find all entities', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toStrictEqual([entity]);
    });
    it('should throw error when updating a not found entity', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        expect(repository.update(entity)).rejects.toThrow(new notFound_error_1.default(`Entity not found using id ${entity.id}`));
    });
    it('should throw error when deleting a not found entity', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        expect(repository.delete(entity.id)).rejects.toThrow(new notFound_error_1.default(`Entity not found using id ${entity.id}`));
    });
    it('should update an entity', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        await repository.insert(entity);
        const updatedEntity = new StubEntity({ title: 'tchutchucão', price: -5 }, entity.UniqueEntityId);
        await repository.update(updatedEntity);
        expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it('should delete an entity', async () => {
        const entity = new StubEntity({ title: 'teste', price: 24 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);
        await repository.insert(entity);
        await repository.delete(entity.UniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});
