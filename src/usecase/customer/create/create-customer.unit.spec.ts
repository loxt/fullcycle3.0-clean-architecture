import CreateCustomerUseCase from "./create-customer.usecase";

const input = {
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'City',
    number: 123,
    zip: '12345',
  }
}

const CustomerRepositoryMock = () => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create customer use case', function () {
  it('should create a customer', async function () {
    const customerRepository = CustomerRepositoryMock()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      }
    })
  });
});
