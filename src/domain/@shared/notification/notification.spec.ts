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

    expect(notification.messages()).toBe('customer: error message, customer: error message 2, checkout: error message 3');
  });

  it('should check if notification has at least one error', function() {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);
    notification.addError({message: 'error message', context: 'customer'});
    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errors props', function() {
    const notification = new Notification();
    notification.addError({message: 'error message', context: 'customer'});
    notification.addError({message: 'error message 2', context: 'customer'});
    notification.addError({message: 'error message 3', context: 'checkout'});
    expect(notification.getErrors()).toEqual([
      {message: 'error message', context: 'customer'},
      {message: 'error message 2', context: 'customer'},
      {message: 'error message 3', context: 'checkout'},
    ]);
  });
});

