import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list-customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
    'C1',
    new Address('Rua 1', 123, '79740000', 'SP'),
);

const customer2 = CustomerFactory.createWithAddress(
    'C2',
    new Address('Rua 2', 345, '79740000', 'MS'),
);


const MockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test for listing customers use case', function() {
  it('should list customers', async function() {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);
    const output = await useCase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
