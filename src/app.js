const env = require('dotenv').config();
const express = require('express');
const app = express();
const api = require('./routes/index')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const morgan = require('morgan')

mongoose.connect(process.env.DATABASE_URL, {
  dbName: 'JDLT',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err))

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api)

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

module.exports = app;