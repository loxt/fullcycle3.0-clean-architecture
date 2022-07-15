import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update-customer.usecase';

const customer = CustomerFactory.createWithAddress(
    'John',
    new Address('Street', 123, 'zip', 'city'),
);

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 321,
    zip: 'zip updated',
    city: 'city updated',
  },
};

const CustomerRepositoryMock = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe('Unit test for customer update use case', function() {
  it('should update a customer', async function() {
    const customerRepository = CustomerRepositoryMock();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
