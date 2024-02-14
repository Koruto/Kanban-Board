import { openConnection, closeConnection } from './database.js';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import getRoute from './routes/getRoutes.js';
import postRoute from './routes/postRoutes.js';
import updateRoute from './routes/updateRoutes.js';
import deleteRoute from './routes/deleteRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.use('/', getRoute);

// POST REQUESTS

app.use('/', postRoute);

// UPDATE REQUEST

app.use('/', updateRoute);

// Delete Request

app.use('/', deleteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// closeConnection(db);
