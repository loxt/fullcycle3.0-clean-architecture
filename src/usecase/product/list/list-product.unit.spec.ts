import Product from '../../../domain/product/entity/product';
import {v4 as uuid} from 'uuid';
import ListProductUseCase from './list-product.usecase';

const product = new Product(uuid(), 'Product 1', 100);
const product2 = new Product(uuid(), 'Product 2', 100);

const ProductRepositoryMock = () => {
  return {
    create: jest.fn(),
    findById: jest.fn().mockResolvedValue(product),
    findAll: jest.fn().mockResolvedValue([product, product2]),
    update: jest.fn(),
  };
};

describe('unit tests for list product usecase', function() {
  it('should list products', async function() {
    const repository = ProductRepositoryMock();
    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute();
    expect(output.products.length).toBe(2);
  });
});
