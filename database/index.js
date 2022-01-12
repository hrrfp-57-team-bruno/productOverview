const mysql = require('mysql2');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(err => {
  if (err) {
    console.log('error:: ', err);
  } else {
    console.log('Connected!');
  }
});

// // Your Database Queries Here!!
const getAll = callback => {
  const sqlSelect = 'SELECT * FROM product_listDummy';
  // const sqlSelect = 'SELECT * FROM product_list';
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err.message);
    }
    callback(err, results);
  });
};

// const create = (productPacket, callback) => {
//   const sqlCreate = `INSERT INTO product_list (name, description) VALUES(?, ?)`;
//   connection.query(sqlCreate,[productPacket], (err, results) => {
//       if (err) {
//         console.error(err.message);
//       }
//       callback(err, results);
//     }
//   );
// };

// const deleteProduct = (id, callback) => {
//   // console.log(id);
//   const sqlDelete = `DELETE FROM product_list WHERE id= ?`;
//   connection.query(sqlDelete, id, (err, results) => {
//     if(err) {
//       console.log(err);
//       callback(err)
//     } else {
//       callback(err, results);
//     }
//   });
// }

// const updateProduct = (product, id, callback) => {
//   const sqlUpdate = 'UPDATE product_list SET name = ?, description = ? WHERE id = ?';
//   connection.query(sqlUpdate,[product, id], (err, result) => {
//     if (err) {
//       console.log(err);
//       callback(err);
//     } else {
//       callback(err, result);
//     }
//   });
// };

// Don't forget to export your functions!
module.exports = {
  db: connection,
  getAll,
  // create,
  // deleteProduct,
  // updateProduct
};