import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find-customer.usecase';

const customer = new Customer('123', 'John');
const address = new Address('Street', 123, '7974000', 'City');
customer.changeAddress(address);

const CustomerRepositoryMock = () => {
  return {
    findById: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find customer use case', () => {
  it('should find a customer', async function() {
    const customerRepository = CustomerRepositoryMock();
    await customerRepository.create(customer);

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: '7974000',
        city: 'City',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a customer', async function() {
    const customerRepository = CustomerRepositoryMock();
    await customerRepository.findById.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };


    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
