const httpConstants = require('http2').constants;
const NOT_FOUND_INDEX = -1;
const RESPONSE_MSG = {
    PRODUCT: {
        NOT_FOUND: 'Product not found',
        INVALID: 'Product invalid',
        REMOVED: 'Product removed'
    }
};

const db = {
    products: [
        { id: 1, description: 'Arroz parboilizado 5Kg', value: 25.00, brand: 'Tio João' },
        { id: 2, description: 'Maionese 250gr', value: 7.20, brand: 'Helmans' },
        { id: 3, description: 'Iogurte Natural 200ml', value: 2.50, brand: 'Itambé' },
        { id: 4, description: 'Batata Maior Palha 300gr', value: 15.20, brand: 'Chipps' },
        { id: 5, description: 'Nescau 400gr', value: 8.00, brand: 'Nestlé' },
    ]
};

const responseBodyMsg = (message) => ({ message });

const findProductIndex = (id) => {
    id = +id;
    return db.products.findIndex(p => p.id === id);
}
const isValidProduct = (product) => product.description && product.value > 0 && product.brand;

const getAllProducts = (_req, res) => {
    res.json(db);
};

const getProductById = (req, res) => {
    const id = req.params.id;
    const product = db.products.find(p => p.id === id);
    if (product) {
        res.json(product);
        return;
    }
    res.status(httpConstants.HTTP_STATUS_OK).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.NOT_FOUND));
};

const createProduct = (req, res) => {
    const product = req.body;
    if (!isValidProduct(product)) {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.INVALID));
        return;
    }
    db.products.push(product);
    res.status(httpConstants.HTTP_STATUS_CREATED).json(product);
};

const updateProduct = (req, res) => {
    const id = req.params.id;
    const product = req.body;
    if (!isValidProduct(product)) {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.INVALID));
        return;
    }
    const index = findProductIndex(id);
    if (index === NOT_FOUND_INDEX) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.NOT_FOUND));
        return;
    }
    db.products[index] = product;
    res.status(httpConstants.HTTP_STATUS_OK).json(product);
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    const index = findProductIndex(id);
    if (index === NOT_FOUND_INDEX) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.NOT_FOUND));
        return;
    }
    db.products.splice(index, 1);
    res.status(httpConstants.HTTP_STATUS_OK).send(responseBodyMsg(RESPONSE_MSG.PRODUCT.REMOVED));
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};