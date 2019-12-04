import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }),
);


app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'welcome to Role Management System API'
  });
});

app.all('*', (_, res) => {
  res.status(404).send({
    status: 'error',
    error: 'invalid route, route is not in the API'
  });
});
const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
