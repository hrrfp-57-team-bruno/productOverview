const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(morgan('dev'));
app.use(cors());
//========Test response time========
// const newrelic = require('newrelic');
app.get('/api/test', (req, res) => {
  const randNum = Math.random() * 0.1;
  const randTimeInMs = randNum * 1000;
  setTimeout(() => {
    res.send(`Hello from /api/test. You received a response in ${randNum.toFixed(2)} seconds`);
  }, randTimeInMs)
});

//========Loader IO========
// app.get('/loaderio-9619b42ac20175ad99bff04b15088e70.txt', (req, res) => {
//     res.send('loaderio-9619b42ac20175ad99bff04b15088e70.txt');
// });
//========Test response time========

app.use('/api', router);

const PORT = 8000;

app.listen(PORT, () => {
  console.log('Listening to localhost port:', PORT);
});