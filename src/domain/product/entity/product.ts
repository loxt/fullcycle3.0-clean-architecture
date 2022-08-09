import ProductInterface from './product.interface';
import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProductValidatorFactory from '../factory/product.validator.factory';

export default class Product extends Entity implements ProductInterface {
  constructor(
      id: string,
    private _name: string,
    private _price: number,
  ) {
    super();
    this._id = id;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
  }

  changeName(newName: string) {
    this._name = newName;
  }

  changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }
}
