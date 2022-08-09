import Product from '../entity/product';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import ProductYupValidator from '../validator/product.yup.validator';

export default class ProductValidatorFactory {
  public static create(
  ): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
