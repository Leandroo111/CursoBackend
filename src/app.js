const express = require('express');
const ProductsManager = require('./productManager');
const path = '../Products/products.json'

const app = express()

const products = new ProductsManager(path);

app.get('/products', async (req, res,) => {

    const { limit } = req.query
    const response = await products.getProducts(limit)
    res.send(response)
})

app.get('/products/:pid', async (req, res,) => {

    const { pid } = req.params
    const response = await products.getProductById(pid)
    res.send(response)
})

app.listen(8080, err => {

    if (err) console.log(err)

    console.log('Dscuchando el puerto 8080')
})
