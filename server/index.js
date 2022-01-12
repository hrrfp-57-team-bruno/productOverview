const express = require('express');
const axios = require('axios');
const db = require('../database/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8000;

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.listen(PORT, () => {
  console.log(`Server listening at localhost: ${PORT}!`);
});

// // testing
app.get('/products', (req, res) => {
  res.send('Hello World! from the server side!');
});

app.get('/api/products', (req, res) => {
  db.getAll((err, products) => {
    if (err) {
      console.log(err);
      res.status(404).json('NOT FOUND');
    } else {
      res.status(200).send(products);
    }
  });
});

// // insert cows into database
// app.post('/api/products', (req, res) => {
//   const {name, description} = req.body;
//   const newProduct = {name, description};
//   console.log("newProduct is: ", newProduct);
//   db.create(newProduct, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json('Cannot Post Product');
//     } else {
//       res.status(201).send('Product Data Posted!');
//     }
//   });
// });
// // delete cow by id
// app.delete('/api/products/:id', (req, res) => {
//   const {id} = req.params;
//   db.deleteProduct(id, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json('Cannot delete product');
//     } else {
//       res.status(200).json('Deleted!!!!');
//     }
//   })
// });
// update
// app.put('/api/products/:id', (req, res) => {
//   const {id} = req.params;
//   const {name, description} = req.body;
//   const product = {name, description};
//   db.updateProduct(product, id, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json('Cannot update product');
//     } else {
//       res.status(200).json('Product Updated');
//     }
//   })
// });

