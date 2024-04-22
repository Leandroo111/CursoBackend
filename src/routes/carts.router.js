import { Router } from 'express'
import CartsManager from '../managers/cartManager.js'
import ProductsManager from '../managers/productManager.js'
const cartsPath = './src/file/carts.json'
const productsPath ='./src/file/products.json'

const router = Router()
const carts = new CartsManager (cartsPath)
const products = new ProductsManager(productsPath)

router.post('/', async (req, res,) => {
    const response = await carts.createCarts()
    res.send(response)
})

router.get('/:cid', async (req, res,) => {

    const { cid } = req.params
    const response = await carts.getCartById(parseInt(cid))
    res.send(response)
})

router.post('/:cid/products/:pid', async (req, res,) => {

    const { cid, pid } = req.params

    if(isNaN(pid)) return res.send('El parametro pid debe ser un numero')

    const productFound = await products.getProductById(parseInt(pid))

    if(productFound === 'No se encontro un producto con ese ID' || productFound === 'Ingrese un Id' ) res.send('No se encontro un producto con ese ID')
        
    else {
        const response = await carts.addProductsToCart(parseInt(cid), {product: parseInt(pid), quantity: 1})
        res.send(response)
    }
    
})

export default router