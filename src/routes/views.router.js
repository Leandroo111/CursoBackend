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

export default router