import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import food from './routes/food.route';
import Auth from './controller/auth.controller';
import { CronJob } from 'cron';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const job = new CronJob(
  '00 00 00 * * *',
  () => {
    Auth.fatSecret(process.env.CLIENT_ID as string, process.env.CLIENT_SECRET as string);
    console.log('Token refreshed');
  },
  null,
  true,
  'America/Sao_Paulo',
  null,
  true
);
job.start();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Welcome to My Is it Low-carb? API.');
});

app.use('/food', food);

app.listen(PORT, () => console.log(`Connected and running on port ${PORT}`));
