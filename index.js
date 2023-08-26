const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./services');
const app = express();

app.use(express.json());
const PORT = 3000;

app.get('/products', getAllProducts);

app.get('/products/:id', getProductById);

app.post('/products', createProduct);

app.put('/products/:id', updateProduct);

app.delete('/products/:id', deleteProduct);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT} 🚀`);
});
