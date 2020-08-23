import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const redis = new Redis();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Welcome to My Is it Low-carb? API.');
});

app.listen(PORT, () => console.log(`Connected and running on port ${PORT}`));
