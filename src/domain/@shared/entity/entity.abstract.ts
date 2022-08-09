import Notification from '../notification/notification';

export default abstract class Entity {
  protected _id: string;
  protected notification: Notification;

  protected constructor() {
    this.notification = new Notification();
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
