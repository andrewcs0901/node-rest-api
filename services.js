const httpConstants = require('http2').constants;
const NOT_FOUND_INDEX = -1;

const listaProdutos = {
    produtos: [
        { id: 1, descricao: 'Arroz parboilizado 5Kg', valor: 25.00, marca: 'Tio João' },
        { id: 2, descricao: 'Maionese 250gr', valor: 7.20, marca: 'Helmans' },
        { id: 3, descricao: 'Iogurte Natural 200ml', valor: 2.50, marca: 'Itambé' },
        { id: 4, descricao: 'Batata Maior Palha 300gr', valor: 15.20, marca: 'Chipps' },
        { id: 5, descricao: 'Nescau 400gr', valor: 8.00, marca: 'Nestlé' },
    ]
};

const findProductIndex = (id) => {
    id = +id;
    return listaProdutos.produtos.findIndex(p => p.id === id);
}
const isValidProduct = (product) => product.descricao && product.valor > 0 && product.marca;

const getAllProducts = (_req, res) => {
    res.json(listaProdutos);
};

const getProductById = (req, res) => {
    const id = req.params.id;
    const product = listaProdutos.produtos.find(p => p.id === id);
    if (product) {
        res.json(product);
        return;
    }
    res.status(httpConstants.HTTP_STATUS_OK).send('Produto não encontrado');
};

const createProduct = (req, res) => {
    const product = req.body;
    if (!isValidProduct(product)) {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send('Produto inválido');
        return;
    }
    listaProdutos.produtos.push(product);
    res.status(httpConstants.HTTP_STATUS_CREATED).json(product);
};

const updateProduct = (req, res) => {
    const id = req.params.id;
    const product = req.body;
    if (!isValidProduct(product)) {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send('Produto inválido');
        return;
    }
    const index = findProductIndex(id);
    if (index === NOT_FOUND_INDEX) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send('Produto não encontrado');
        return;
    }
    listaProdutos.produtos[index] = product;
    res.status(httpConstants.HTTP_STATUS_OK).json(product);
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    const index = findProductIndex(id);
    if (index === NOT_FOUND_INDEX) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send('Produto não encontrado');
        return;
    }
    listaProdutos.produtos.splice(index, 1);
    res.status(httpConstants.HTTP_STATUS_OK).send('Produto removido');
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};