import Foodstore from '../../model/food.model';
import db from '../../config/db';

jest.mock('../../config/db');

describe('Food Model tests', () => {
  it('get food from redis', async () => {
    const foodMock = { name: 'avocado', lowcarb: 1 };

    (db.hgetall as jest.Mock).mockResolvedValue(foodMock);

    const food = await Foodstore.get('Avocado');

    expect(db.hgetall).toHaveBeenCalledWith('avocado');
    expect(food).toHaveProperty('name', 'avocado');
  });

  it('save food to redis', () => {
    const foodMock = { id: 31481, lowcarb: 1, isCached: 1 };

    (db.multi as jest.Mock).mockReturnThis();
    (db.hset as jest.Mock).mockReturnThis();

    Foodstore.set('Egg', foodMock);

    expect(db.multi).toHaveBeenCalledTimes(1);
    expect(db.hset).toHaveBeenCalledTimes(3);
    expect(db.exec).toHaveBeenCalledTimes(1);
  });

  it('delete food from redis store', () => {
    Foodstore.del('EgG');

    expect(db.del).toHaveBeenCalledTimes(1);
    expect(db.del).toHaveBeenCalledWith('egg');
  });
});
