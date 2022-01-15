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
      res.send(data);
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  controller.getProductInfo(id, (error, data) => {
    if (error) {
      res.status(400);
    } else if (data.rows.length === 0) {
        data = {
          "product_id": id.toString(),
          "results": [{
            "style_id": 0,
            "name": "",
            "original_price": "",
            "sale_price": null,
            "default?": true,
            "photos": [{
              "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }],
            "skus": {
              "null": {
                  "quantity": null,
                  "size": null
              }
          }
          }],
        }
        res.send(data);
      } else {
        data.rows[0].product_id = data.rows[0].product_id.toString();
        data.rows[0].results.forEach(result => {
          result.original_price = result.original_price.toFixed(2);
          if(result.photos === null) {
            result.photos = [{
              "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }]
          }
          if (result.skus === null) {
            result.skus = {
              "null": {
                "quantity" : null,
                "size" : null
              }
            }
          }
        })
        res.send(data.rows[0]);
      }
  });
});

router.get('/products/:product_id', (req, res) => {
  const id = req.params.product_id;
  controller.getSingleProduct(id, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});

router.get('/products/:product_id/related', (req, res) => {
  const {product_id} = req.params;
  controller.getRelatedProduct(product_id, (error, data) => {
    if (error) {
      res.status(400);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;