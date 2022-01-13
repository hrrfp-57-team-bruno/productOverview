const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);
const PORT = 8000;
app.listen(PORT, () => {
  console.log('Listening to localhost port:', PORT);
});