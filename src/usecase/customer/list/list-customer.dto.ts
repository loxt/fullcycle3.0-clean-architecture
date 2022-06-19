export interface InputListCustomerDto {

}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
    number: number;
  }
}

export interface OutputListCustomerDto {
  customers: Customer[];
}
