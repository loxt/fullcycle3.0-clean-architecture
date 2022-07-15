import Product from '../../../domain/product/entity/product';
import {v4 as uuid} from 'uuid';
import UpdateProductUseCase from './update-product.usecase';

const product = new Product(uuid(), 'Product 1', 100);

const input = {
  id: product.id,
  name: product.name,
  price: 200,
};

const ProductRepositoryMock = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe('Unit test for product update use case', function() {
  it('should update a product', async function() {
    const productRepository = ProductRepositoryMock();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
