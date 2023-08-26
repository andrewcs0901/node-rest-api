const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./services');
const app = express();

app.use(express.json());
const PORT = 3000;

app.get('/produtos', getAllProducts);

app.get('/produtos/:id', getProductById);

app.post('/produtos', createProduct);

app.put('/produtos/:id', updateProduct);

app.delete('/produtos/:id', deleteProduct);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
