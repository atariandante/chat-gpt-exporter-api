import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import routes from './routes';
import cookiesMiddleware from './middlewares/cookies';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookiesMiddleware);

app.use(`/api/${process.env.API_VERSION || 'v1'}`, routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
