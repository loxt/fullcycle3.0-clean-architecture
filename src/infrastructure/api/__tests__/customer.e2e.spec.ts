import request from 'supertest';
import {app, sequelize} from '../express';

describe('E2E tests for customer', function() {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
        .post('/customers')
        .send({
          name: 'John Doe',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            number: 123,
            zip: '12345',
          },
        });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('123 Main St');
    expect(response.body.address.city).toBe('Anytown');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe('12345');
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(500);
  });
});
