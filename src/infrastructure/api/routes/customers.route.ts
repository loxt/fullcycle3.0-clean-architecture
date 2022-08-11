import express, {Request, Response} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create-customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import {InputCreateCustomerDto} from '../../../usecase/customer/create/create-customer.dto';
import ListCustomerUseCase from '../../../usecase/customer/list/list-customer.usecase';
import CustomerPresenter from '../presenters/customer.presenter';

export const customersRoute = express.Router();

customersRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };

    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customersRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute();
  res.format({
    json: async () => {
      res.send(output);
    },
    xml: async () => {
      res.send(CustomerPresenter.toXML(output));
    },
  });

  // try {
  //   const output = await usecase.execute();
  //   res.status(200).send(output);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});
