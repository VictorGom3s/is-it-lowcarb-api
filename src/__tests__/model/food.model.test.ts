import FoodModel from '../../model/food.model';
import db from '../../config/db';

describe('Food cache', () => {
  let foodModel: FoodModel;

  beforeAll(() => {
    foodModel = new FoodModel();
  });

  afterAll(() => {
    db.quit();
    db.disconnect();
  });

  it('save the food to the db', async () => {
    const foodMock = {
      name: 'Avocado',
      isItLowcarb: 1,
      protein: 10,
      carbs: 1,
      fat: 10,
    };

    expect(await foodModel.save(foodMock.name, foodMock)).toEqual('Success');
  });

  it('fetch the food from the db', async () => {
    expect(await foodModel.get('Avocado')).toEqual({
      name: 'avocado',
      isItLowcarb: '1',
      protein: '10',
      carbs: '1',
      fat: '10',
    });
  });
});
