const env = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const morgan = require('morgan')

const productRoutes = require('../src/routes/products')

mongoose.connect(process.env.DATABASE_URL, {
  dbName: 'jdlt-api',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err))

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/products', productRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
})

app.use((req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`))