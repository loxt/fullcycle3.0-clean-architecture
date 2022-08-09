import ProductInterface from './product.interface';
import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';

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
    if (this._id.length === 0) {
      this.notification.addError({
        context: 'product',
        message: 'Id is required',
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: 'product',
        message: 'Name is required',
      });
    }
    if (this._price <= 0) {
      this.notification.addError({
        context: 'product',
        message: 'Price must be greater than zero',
      });
    }
  }

  changeName(newName: string) {
    this._name = newName;
  }

  changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }
}
