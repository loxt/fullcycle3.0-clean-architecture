import Notification from './notification';

describe('Unit tests for notifications', function() {
  it('should create errors', function() {
    const notification = new Notification();
    const error = {
      message: 'error message',
      context: 'customer',
    };
    notification.addError(error);

    expect(notification.messages('customer')).toBe('customer: error message');

    const error2 = {
      message: 'error message 2',
      context: 'customer',
    };
    notification.addError(error2);

    expect(notification.messages('customer')).toBe('customer: error message, customer: error message 2');

    const error3 = {
      message: 'error message 3',
      context: 'checkout',
    };
    notification.addError(error3);
    expect(notification.messages('customer')).toBe('customer: error message, customer: error message 2');
    expect(notification.messages('checkout')).toBe('checkout: error message 3');
  });
});

