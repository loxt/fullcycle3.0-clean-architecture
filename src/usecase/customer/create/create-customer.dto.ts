interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export {InputCreateCustomerDto, OutputCreateCustomerDto};
