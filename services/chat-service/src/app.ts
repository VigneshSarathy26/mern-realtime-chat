import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from '@vigneshsarathy/shared';

const app = express();
app.use(json());

app.use(errorHandler);

export { app };
