const router = require('express').Router();
const controller = require('./overview');

router.get('/products', (req, res) => {
  let { page, count } = req.query;

  if (!page) {
    page = 1;
  }
  if (!count) {
    count = 300;
  }
  controller.getAllProducts(page, count, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      // res.send('get from api/product:: ');
      res.send(data);
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  controller.getProductInfo(id, (error, data) => {
    // console.log(data.product_id.toString())
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});

router.get('/products/:product_id', (req, res) => {
  const id = req.params.product_id;
  // console.log(id);
  controller.getSingleProduct(id, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
