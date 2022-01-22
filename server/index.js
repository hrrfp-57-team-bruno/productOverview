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
//     res.sendFile('/Users/hathadam/Google Drive/sdc/productOverviewSQL/loaderio-9619b42ac20175ad99bff04b15088e70.txt');
// });

// ========Loader IO for AWS Deployment========
// app.get('/loaderio-cea2d99725d9edf32c2f0f701706bb9f.txt', (req, res) => {
//   res.sendFile('/home/ubuntu/loaderio-cea2d99725d9edf32c2f0f701706bb9f.txt');
// });

app.get('/loaderio-480af182666c09c917299c9387574c69.txt', (req, res) => {
  res.sendFile('/home/ubuntu/loader.txt');
});

//========Test response time========

app.use('/api', router);

const PORT = 8000;

app.listen(PORT, () => {
  console.log('Listening to localhost port:', PORT);
});