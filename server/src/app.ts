import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import cors from 'cors';
import { deserializeUser } from './middleware/deserializeUser';



const port = config.get<number>('port');

const app = express();
app.use(cors())
app.use(express.json());

app.use(deserializeUser)

app.listen(port, async() => {
  logger.info(`Server running on port ${port}`);

  await connect();

  routes(app);
});