interface InputFindCustomerDto {
  id: string;
}

interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: string;
    zip: string;
  };
}

export { InputFindCustomerDto, OutputFindCustomerDto };
