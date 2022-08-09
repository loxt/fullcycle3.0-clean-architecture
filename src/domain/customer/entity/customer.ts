import Address from '../value-object/address';
import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import CustomerValidatorFactory from '../factory/customer.validator.factory';

export default class Customer extends Entity {
  constructor(
      id: string,
    private _name: string,
    public address?: Address,
    private active: boolean = false,
    private _rewardPoints: number = 0,
  ) {
    super();
    this._id = id;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address): void {
    this.address = address;
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this.active;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this.address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
