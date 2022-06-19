import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {OutputListCustomerDto} from './list-customer.dto';
import Customer from '../../../domain/customer/entity/customer';

export default class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          zip: customer.address.zip,
          number: customer.address.number,
        },
      })),
    };
  }
}
