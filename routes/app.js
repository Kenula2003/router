require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const planetsRouter = require('./routes/planets');
const app = express();


app.use(express.json());

app.use(morgan('dev'));

app.use('/api/planets', planetsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
