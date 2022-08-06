import Address from '../value-object/address';
import Entity from '../../@shared/entity/entity.abstract';

export default class Customer extends Entity {
  constructor(
    private _name: string,
    public address?: Address,
    private active: boolean = false,
    private _rewardPoints: number = 0,
  ) {
    super();
    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages());
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
    if (this.id.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Id is required',
      });
    }
    if (this.name.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Name is required',
      });
    }
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
