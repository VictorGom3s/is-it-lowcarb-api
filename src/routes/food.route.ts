import express from 'express';

const food = express.Router();

food.get('/:food', (req, res) => {
  res.send(req.params.food);
});

export default food;
