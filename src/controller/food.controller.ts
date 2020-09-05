import { Request, Response } from 'express';
import Foodstore from '../model/food.model';
import axios from '../config/axios.config';

class Food {
  async get(req: Request, res: Response) {
    try {
      const { food } = req.body;
      if (!food) throw new Error('Food cannot be undefined');

      let result = await Foodstore.get(food);

      if (Object.keys(result).length == 0) {
        /* Search food by name */
        const { data: foods } = await axios.get(
          `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${food}&weight=100&format=json`
        );
        const foodID = foods.foods.food[0].food_id;
        console.log(foodID);

        /* Get food by id */
        const { data: apiFood } = await axios.get(
          `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=${foodID}&format=json`
        );

        console.log(apiFood);

        result = { name: apiFood.food.food_name };

        /* Save food to the store */
      }

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
export default Food;
