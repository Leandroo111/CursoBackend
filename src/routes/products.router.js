import { Router } from 'express'
import ProductsManager from '../managers/productManager.js'
const path = './src/file/products.json'

const router = Router()
const products = new ProductsManager(path)

router.get('/', async (req, res,) => {

    const { limit } = req.query
    const response = await products.getProducts(limit)
    res.send(response)
})

router.get('/:pid', async (req, res,) => {

    const { pid } = req.params
    const response = await products.getProductById(parseInt(pid))
    res.send(response)
})

router.post('/', async (req, res,) => {
    const { title, description, price, status, code, stock, category, thumbnail } = req.body

    if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof code !== 'string' || typeof stock !== 'number' || typeof category !== 'string' || typeof thumbnail !== 'string') return res.send ('Respete el formato')
    const newProduct = {
        title,
        description,
        price,
        status,
        code,
        stock,
        category,
        thumbnail
    }
    
    const response = await products.addProducts(newProduct)
    res.send(response)
})

router.put('/:pid', async (req, res,) => {

    const { pid } = req.params
    const response = await products.updateProduct(parseInt(pid), req.body)
    res.send(response)
})

router.delete('/:pid', async (req, res,) => {

    const { pid } = req.params
    const response = await products.deleteProduct(parseInt(pid))
    res.send(response)
})


export default router