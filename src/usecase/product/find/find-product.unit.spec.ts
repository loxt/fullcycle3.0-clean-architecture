import Product from '../../../domain/product/entity/product';
import {v4 as uuid} from 'uuid';
import FindProductUseCase from './find-product.usecase';
import {InputFindProductDto} from './find-product.dto';

const product = new Product(uuid(), 'Product 1', 100);

const ProductRepositoryMock = () => {
  return {
    create: jest.fn(),
    findById: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe('unit tests for find product usecase', function() {
  it('should find product by id', async function() {
    const repository = ProductRepositoryMock();
    const usecase = new FindProductUseCase(repository);

    const inputFindProduct: InputFindProductDto = {
      id: product.id,
    };

    const outputProduct = await usecase.execute(inputFindProduct);

    expect(outputProduct.id).toBe(product.id);
    expect(outputProduct.name).toBe(product.name);
    expect(outputProduct.price).toBe(product.price);
  });
});
