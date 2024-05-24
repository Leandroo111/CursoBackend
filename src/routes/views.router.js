import { Router } from "express";
import ProductsManager from '../managers/productManager.js'
import { __dirname } from "../utils.js";
const productsPath = './src/file/products.json'

const router = Router()
const products = new ProductsManager(productsPath)

const productos = await products.getProducts()



router.get('/', async (req, res) => {
    res.render('home', {
        productos
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const { io } = req
    let productList = []

    io.on('connection', socket => {
        console.log('Cliente conectado')
        socket.on('product', async data => {
            const addProduct = await products.addProducts(data)
            const getProducts = await products.getProducts()
            console.log('Producto agragado:', addProduct)
            productList = getProducts
            console.log(productList)
            io.emit('productList', productList)
        })
    })
})

export default router