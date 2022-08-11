import {toXML as jsonToXML} from 'jstoxml';
import {OutputListCustomerDto} from '../../../usecase/customer/list/list-customer.dto';

export default class CustomerPresenter {
  public static toXML(data: OutputListCustomerDto): string {
    return jsonToXML({
      customers: {
        customer: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zip: customer.address.zip,
          },
        })),
      },
    }, {header: true, indent: ' '});
  }
}
