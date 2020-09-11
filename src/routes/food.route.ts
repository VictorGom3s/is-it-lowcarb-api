import express from 'express';
import Food from '../controller/food.controller';

const foodC = new Food();
const food = express.Router();

food.post('/:food', foodC.get.bind(foodC));
food.post('/new/save', foodC.save.bind(foodC));

export default food;
