interface InputFindCustomerDto {
  id: string;
}

interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export {InputFindCustomerDto, OutputFindCustomerDto};

