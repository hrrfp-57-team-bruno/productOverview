const { Pool } = require('pg');
const dbConfig = require('./config');

const pool = new Pool(dbConfig);

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

module.exports.getAllProducts = (page, count, cb) => {
  // console.log(page, count);
  const query = `SELECT *
                  FROM products
                  WHERE product_id BETWEEN ${page} AND ${count * page}`;
  pool.query(query, (err, data) =>{
    if (err) {
      console.log('error frin getAllProducts:: ', err);
    } else {
      cb(err, data);
    }
  })
};

module.exports.getProductInfo = async (pId, cb) => {
  const query2 = `SELECT
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

  pool.query(query2)
    .then((response) => {
      cb(null, response.rows[0]);
    })
    .catch((error) => {
      cb(error, null);
    });
};

module.exports.getSingleProduct = async (pId, cb) => {
  const query2 = `SELECT
                  products.product_id,
                  products.name,
                  products.slogan,
                  products.description,
                  products.category,
                  products.default_price,
                    json_agg(
                      json_build_object(
                        'feature', features.feature,
                        'value', features.value
                      )
                    )
                  AS features
                  FROM products
                  LEFT JOIN features
                  ON products.product_id = features.product_id
                  WHERE products.product_id = ${pId}
                  GROUP BY products.product_id,
                    products.name,
                    products.slogan,
                    products.description,
                    products.category,
                    products.default_price`;

  pool.query(query2)
    .then((response) => {
      cb(null, response.rows[0]);
    })
    .catch((error) => {
      cb(error, null);
    });
};
