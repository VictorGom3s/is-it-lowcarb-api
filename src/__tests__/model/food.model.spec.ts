import Foodstore from '../../model/food.model';
import db from '../../config/db';

jest.mock('../../config/db');

describe('Food Model tests', () => {
  it('get food from redis', async () => {
    const foodMock = { name: 'avocado', carbs: 10, fat: 10, fiber: 10, protein: 10, lowcarb: 1 };

    (db.hgetall as jest.Mock).mockResolvedValue(foodMock);

    const food = await Foodstore.get('Avocado');

    expect(db.hgetall).toHaveBeenCalledWith('avocado');
    expect(food).toEqual(foodMock);
  });

  it('save food to redis', () => {
    const foodMock = { name: 'egg', carbs: 0, fat: 10, fiber: 10, protein: 10, lowcarb: 1 };

    (db.multi as jest.Mock).mockReturnThis();
    (db.hset as jest.Mock).mockReturnThis();

    Foodstore.set('Egg', foodMock);

    expect(db.multi).toHaveBeenCalledTimes(1);
    expect(db.exec).toHaveBeenCalledTimes(1);
    expect(db.hset).toHaveBeenCalledTimes(6);
    expect(db.hset).toHaveBeenNthCalledWith(1, 'egg', 'name', 'egg');
    expect(db.hset).toHaveBeenNthCalledWith(2, 'egg', 'lowcarb', 1);
  });

  it('delete food from redis store', () => {
    Foodstore.del('EgG');

    expect(db.del).toHaveBeenCalledTimes(1);
    expect(db.del).toHaveBeenCalledWith('egg');
  });
});
