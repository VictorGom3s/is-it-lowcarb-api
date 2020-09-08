import express from 'express';
import Food from '../controller/food.controller';

const foodC = new Food();
const food = express.Router();

food.post('/:food', foodC.get);
food.post('/new/save', foodC.save);

export default food;
