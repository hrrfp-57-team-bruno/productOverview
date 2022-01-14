const { Pool } = require('pg');
const dbConfig = require('./config');

const pool = new Pool(dbConfig);

//get all products
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
      res.rows[0].product_id = res.rows[0].product_id.toString();
      res.rows[0].results.forEach(style => {
        style.original_price = style.original_price.toFixed(2);
        if(style.sale_price !== null){
          style.sale_price = style.sale_price.toFixed(2);
        }
      })
      cb(null, res.rows[0]);
    }
  });
};

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

/////////////////////trying other way//////////////////////////
// using asyn await:::

// module.exports.getAllProducts = async (page, count, cb) => {
//   // console.log(page, count);
//   const query = `SELECT *
//                   FROM products
//                   WHERE product_id BETWEEN ${page} AND ${count * page}`;
//   await pool.query(query)
//     .then((response) => {
//       cb(null, response.rows);
//     })
//     .catch((error) => {
//       cb(error, null);
//     });
// };

// module.exports.getProductInfo = async (pId, cb) => {
//   const query2 = `SELECT
//                     product_id, json_agg(json_build_object(
//                       'style_id', style_id,
//                       'name', name,
//                       'sale_price', sale_price,
//                       'original_price', original_price,
//                       'default?', default_style,
//                       'photos',
//                       (SELECT json_agg(json_build_object(
//                           'thumbnail_url', thumbnail_url,
//                           'url', url
//                         )) FROM photos WHERE style_id = styles.style_id),
//                     'skus',
//                       (SELECT
//                           json_object_agg(sku_id,
//                               json_build_object(
//                             'size', size,
//                             'quantity', quantity
//                               )
//                           ) as skus
//                         FROM skus
//                         WHERE style_id = styles.style_id
//                             GROUP by style_id)
//                     )) as results FROM styles
//                         WHERE styles.product_id = ${pId}
//                           GROUP BY product_id`;

//   await pool.query(query2)
//     .then((response) => {
//       cb(null, response.rows[0]);
//     })
//     .catch((error) => {
//       cb(error, null);
//     });
// };

// module.exports.getSingleProduct = async (pId, cb) => {
//   const query2 = `SELECT
//                   products.product_id,
//                   products.name,
//                   products.slogan,
//                   products.description,
//                   products.category,
//                   products.default_price,
//                     json_agg(
//                       json_build_object(
//                         'feature', features.feature,
//                         'value', features.value
//                       )
//                     )
//                   AS features
//                   FROM products
//                   LEFT JOIN features
//                   ON products.product_id = features.product_id
//                   WHERE products.product_id = ${pId}
//                   GROUP BY products.product_id,
//                     products.name,
//                     products.slogan,
//                     products.description,
//                     products.category,
//                     products.default_price`;

//   pool.query(query2)
//     .then((response) => {
//       cb(null, response.rows[0]);
//     })
//     .catch((error) => {
//       cb(error, null);
//     });
// };