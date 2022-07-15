import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {OutputListProductDto} from './list-product.dto';

export default class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
