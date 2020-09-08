import { Request, Response } from 'express';
import Foodstore from '../model/food.model';
import axios from '../config/axios.config';

class Food {
  async get(req: Request, res: Response) {
    try {
      const { food: name } = req.params;

      if (!name) throw new Error('Missing parameter food');

      let result = await Foodstore.get(name);

      if (Object.keys(result).length == 0) {
        const { data: foods } = await axios.get(
          `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${name}&weight=100&format=json`
        );
        const foodID = foods.foods.food[0].food_id;

        const { data: apiFood } = await axios.get(
          `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=${foodID}&format=json`
        );

        const serving100grams = apiFood.food.servings.serving.filter(
          (serving: { serving_description: string }) => {
            return serving.serving_description == '100 g';
          }
        );

        return res.send({
          name: apiFood.food.food_name,
          id: foodID,
          carbs: serving100grams[0].carbohydrate,
          protein: serving100grams[0].protein,
          fat: serving100grams[0].fat,
          fiber: serving100grams[0].fiber,
          isCached: false,
        });
      }

      return res.send(result);
    } catch (error) {
      return res.status(500).send('Internal Server ' + error);
    }
  }
  save(req: Request, res: Response) {
    try {
      const { food, lowcarb, id } = req.body;

      Foodstore.set(food, { id: id, lowcarb: lowcarb, isCached: 1 });

      return res.send('Food succesfully saved');
    } catch (error) {
      return res.status(500).send('Internal Server ' + error);
    }
  }
}
export default Food;
