import {InputCreateProductDto} from './create-product.dto';
import CreateProductUseCase from './create-product.usecase';

const product1: InputCreateProductDto = {
  name: 'Product 1',
  price: 100,
};

const ProductRepositoryMock = () => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe('unit tests for product usecases', function() {
  it('should create a product', async function() {
    const repository = ProductRepositoryMock();
    const usecase = new CreateProductUseCase(repository);

    const result = await usecase.execute(product1);

    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toBe(product1.name);
    expect(result.price).toBe(product1.price);
  });
});
