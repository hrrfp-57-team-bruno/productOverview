const { Pool } = require('pg');
// const dbConfig = require('./config');

//running locally
// const pool = new Pool({
//   user: 'hathadam',
//   host: 'localhost',
//   database:'postgres',
//   port: 5432
// });

// on aws instances
const pool = new Pool({
  user: 'postgres',
  database:'postgres',
  password: 'f',
  port: 5432
});

module.exports.getAllProducts = (page, count, cb) => {
  const query = `SELECT *
                  FROM products
                  WHERE id BETWEEN ${page} AND ${count * page}`;
  pool.query(query, (err, res) =>{
    if (err) {
      cb(err, null);
    } else {
      res.rows.forEach(product => {
        product.default_price = product.default_price.toFixed(2);
      })
      cb(null, res.rows);
    }
  })
};

//product/:productId/styles
module.exports.getProductInfo = (pId, cb) => {
  const queryInfo = `SELECT
                    product_id, json_agg(json_build_object(
                      'style_id', style_id,
                      'name', name,
                      'sale_price', sale_price,
                      'original_price', original_price,
                      'default?', default_style,
                      'photos',
                      (SELECT json_agg(json_build_object(
                          'thumbnail_url', thumbnail_url,
                          'url', url
                        )) FROM photos WHERE style_id = styles.style_id),
                    'skus',
                      (SELECT
                          json_object_agg(sku_id,
                              json_build_object(
                            'size', size,
                            'quantity', quantity
                              )
                          ) as skus
                        FROM skus
                        WHERE style_id = styles.style_id
                            GROUP by style_id)
                    )) as results FROM styles
                        WHERE styles.product_id = ${pId}
                          GROUP BY product_id`;
  pool.query(queryInfo, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};

//product/:productId
module.exports.getSingleProduct = (pId, cb) => {
  const querySingleProd = `SELECT
                  products.*,
                    json_agg(
                      json_build_object(
                        'feature', features.feature,
                        'value', features.value
                      )
                    )
                  AS features
                  FROM products
                  LEFT JOIN features
                  ON products.id = features.id
                  WHERE products.id = ${pId}
                  GROUP BY products.id,
                    products.name,
                    products.slogan,
                    products.description,
                    products.category,
                    products.default_price`;

  pool.query(querySingleProd, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      res.rows[0].default_price = res.rows[0].default_price.toFixed(2);
      cb(null,res.rows[0])
    }
  })
};

//product/:productId/related
module.exports.getRelatedProduct = (pId, cb) => {
  const queryRelatedProd =`SELECT array_agg(related_product_id) FROM related
                           WHERE related.current_product_id = ${pId}`;
  pool.query(queryRelatedProd, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res.rows[0].array_agg);
    }
  })
};


// 'SELECT products.*, json_agg(json_build_object('feature', features.feature,'value', features.value)) AS features FROM products LEFT JOIN features ON products.id = features.id WHERE products.id = 1 GROUP BY products.id,products.name, products.slogan, products.description, products.category,products.default_price';