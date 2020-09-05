import db from '../config/db';

interface FoodI {
  name: string;
  lowcarb: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

class Foodstore {
  static async get(key: string) {
    try {
      const food = await db.hgetall(key.toLowerCase());
      return food;
    } catch (error) {
      throw new Error('Error getting food from the store: ' + error);
    }
  }

  static set(key: string, food: FoodI) {
    try {
      key = key.toLowerCase();

      db.multi()
        .hset(key, 'name', food.name)
        .hset(key, 'lowcarb', food.lowcarb)
        .hset(key, 'protein', food.protein)
        .hset(key, 'carbs', food.carbs)
        .hset(key, 'fat', food.fat)
        .hset(key, 'fiber', food.fiber)
        .exec();
    } catch (error) {
      throw new Error('Error saving food into the store: ' + error);
    }
  }

  static del(key: string) {
    try {
      db.del(key.toLowerCase());
    } catch (error) {
      throw new Error('Error deleting food from the store: ' + error);
    }
  }
}

export default Foodstore;
