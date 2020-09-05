import { Request, Response } from 'express';
import Food from '../../controller/food.controller';

describe('Food', () => {
  const food = new Food();

  it('get the food from the store or from the API', async () => {
    const req = { body: { food: 'cheese' } };
    const res = { send: jest.fn() };

    await food.get((req as unknown) as Request, (res as unknown) as Response);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).not.toHaveBeenCalledWith({});
  });

  it('return error to user if food name not provided', async () => {
    const req = { body: {} };
    const res = { send: jest.fn(), status: jest.fn() };

    (res.status as jest.Mock).mockReturnThis();

    await food.get((req as unknown) as Request, (res as unknown) as Response);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Internal Server Error');
  });

  xit('save food to the store', () => {});
});
