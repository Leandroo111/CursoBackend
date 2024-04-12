import { Router } from 'express'
import CartsManager from '../managers/cartManager.js'
const path = './src/file/carts.json'

const router = Router()
const carts = new CartsManager (path)

export default router