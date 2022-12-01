import { InMemorySearchableRepository } from "@seedwork/domain/repository/inMemory.repository";
import { Category } from "category/domain/entities/category";
import CategoryRepository from "category/domain/repository/category.repository";

class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository{
}