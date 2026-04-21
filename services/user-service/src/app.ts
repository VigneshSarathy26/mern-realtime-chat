import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from '@vigneshsarathy/shared';

const app = express();
app.use(json());

app.get('/api/users/profile', (req, res) => {
  res.send({ profile: {} });
});

app.use(errorHandler);

export { app };
