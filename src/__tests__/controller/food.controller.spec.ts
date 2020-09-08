import { Request, Response } from 'express';
import Food from '../../controller/food.controller';
import Foodstore from '../../model/food.model';
import axios from '../../config/axios.config';

jest.mock('../../model/food.model');
jest.mock('../../config/axios.config');

describe('Food', () => {
  const food = new Food();

  const responseMock = { send: jest.fn(), status: jest.fn() };
  (responseMock.status as jest.Mock).mockReturnThis();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get the food from the API', async () => {
    const requestMock = { params: { food: 'potato' } };

    (axios.get as jest.Mock).mockResolvedValueOnce({ foods: { foods: { food: { food_id: 1 } } } });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      food: {
        servings: {
          serving: [{ serving_description: '100 g' }],
        },
      },
    });

    await food.get((requestMock as unknown) as Request, (responseMock as unknown) as Response);

    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).not.toHaveBeenCalledWith({});
  });

  it("return an error to the user if food's name were not provided", async () => {
    const requestMock = { body: {}, params: {} };

    await food.get((requestMock as unknown) as Request, (responseMock as unknown) as Response);

    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith('Internal Server Error: Missing parameter food');
  });

  it('save if the food is lowcarb or not', () => {
    const requestMock = { body: { food: 'orange', lowcarb: false, id: 12468 } };

    food.save((requestMock as unknown) as Request, (responseMock as unknown) as Response);

    expect(Foodstore.set).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith('Food succesfully saved');
  });
});
