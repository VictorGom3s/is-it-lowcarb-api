import db from '../config/db';

interface foodI {
  name: string;
  isItLowcarb: number;
  protein: number;
  carbs: number;
  fat: number;
}

class FoodModel {
  async get(key: string) {
    try {
      const food = await db.hgetall(key);
      return food;
    } catch (error) {
      throw new Error('Food not found.');
    }
  }

  async save(key: string, value: foodI) {
    key = key.toLowerCase();
    try {
      db.multi()
        .hset(key, 'name', value.name.toLowerCase())
        .hset(key, 'isItLowcarb', value.isItLowcarb)
        .hset(key, 'protein', value.protein)
        .hset(key, 'carbs', value.carbs)
        .hset(key, 'fat', value.fat)
        .exec(err => {
          if (err) throw new Error('Transaction Error.');
        });

      return 'Success';
    } catch (error) {
      console.log(error);
      throw new Error('Error saving the food on redis');
    }
  }
}

export default FoodModel;
