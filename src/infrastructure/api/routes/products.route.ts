import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create-product.usecase';
import {InputCreateProductDto} from '../../../usecase/product/create/create-product.dto';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list-product.usecase';

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDto);
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productsRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute();
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
