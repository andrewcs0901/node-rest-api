# node-rest-api

Restful toy api with nodejs, express and in memory database

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Routes

### Products

- **GET**: /products

    Get all products, example response:

  - Status: 200

    ```json
    [
        {
            "id": 1,
            "description": "Example product name",
            "value": 25.00,
            "brand": "Product brand"
        },
        {
            "id": 2,
            "description": "Example product name",
            "value": 25.00,
            "brand": "Product brand"
        }
    ]
    ```

- **GET**: /products/:id

    Get product by id, example response:

  - Status: 200

    ```json
    {
        "id": 1,
        "description": "Example product name",
        "value": 25.00,
        "brand": "Product brand"
    }
    ```

  - Status: 404

    ```json
    {
        "message": "Product not found"
    }
    ```

- **POST**: /products

    Create a new product, example body request:

  - Status: 201

    ```json
    {   
        "id": 99,
        "description": "Example product name",
        "value": 25.00,
        "brand": "Product brand"
    }
    ```

  - Status: 400

    ```json
    {
        "message": "Product invalid"
    }
    ```

- **PUT**: /products/:id

    Update product by id, example body request:

  - Status: 200

    ```json
    {   
        "id": 99,
        "description": "Example product name",
        "value": 25.00,
        "brand": "Product brand"
    }
    ```

  - Status: 404

    ```json
    {
        "message": "Product not found"
    }
    ```

- **DELETE**: /products/:id

    Delete product by id

  - Status: 200

    ```json
    {
        "message": "Product removed"
    }
    ```

  - Status: 404

    ```json
    {
        "message": "Product not found"
    }
    ```
