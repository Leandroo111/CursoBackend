import { Router } from 'express'
import CartsManager from '../managers/cartManager.js'
const path = './src/file/carts.json'

const router = Router()
const carts = new CartsManager (path)

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
    const response = await carts.addProductsToCart(parseInt(cid), {product: parseInt(pid), quantity: 1})
    res.send(response)
})

export default router