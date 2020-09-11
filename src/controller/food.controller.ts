import { Request, Response } from 'express';
import Foodstore from '../model/food.model';
import axios from '../config/axios.config';

class Food {
  async get(req: Request, res: Response) {
    console.log('Getting food request');
    try {
      if (!req.params.food) return res.status(401).send('Missing parameter food');

      const { food: name } = req.params;

      let result = await Foodstore.get(name);

      if (Object.keys(result).length == 0) {
        const allFoodFound = await this.getFoodsAPI(name);

        const bestOptions = this.filterBetterOptions(allFoodFound);

        const foodID = bestOptions[0].food_id;

        const { data: apiFood } = await axios.get(
          `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=${foodID}&format=json`
        );

        return res.send({ ...this.getServing100grams(apiFood), id: foodID });
      }

      return res.send(result);
    } catch (error) {
      return res.status(500).send('Internal Server ' + error);
    }
  }

  save(req: Request, res: Response) {
    console.log('Saving to redis request');
    try {
      const { food, lowcarb, id } = req.body;

      Foodstore.set(food, { id: id, lowcarb: lowcarb, isCached: 1 });

      return res.send('Food succesfully saved');
    } catch (error) {
      return res.status(500).send('Internal Server ' + error);
    }
  }

  private async getFoodsAPI(name: string) {
    const { data: foods } = await axios.get(
      `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${name}&weight=100&format=json`
    );

    if (foods.foods.total_results === '0') throw new Error('Nothing Found!');

    return foods.foods.food;
  }

  private filterBetterOptions(foods: any[]) {
    return foods.filter((food: { food_type: string }) => {
      return food.food_type === 'Generic';
    });
  }

  private getServing100grams(food: { food: { servings: { serving: any[] }; food_name: string } }) {
    const serving100grams = food.food.servings.serving.filter(
      (serving: { serving_description: string }) => {
        return serving.serving_description == '100 g';
      }
    );

    return {
      name: food.food.food_name,
      carbs: serving100grams[0].carbohydrate,
      protein: serving100grams[0].protein,
      fat: serving100grams[0].fat,
      fiber: serving100grams[0].fiber,
      sugar: serving100grams[0].sugar,
      isCached: false,
    };
  }
}
export default Food;
