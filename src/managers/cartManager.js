import fs from 'node:fs'

class CartsManager {
    constructor (path) {
        this.path = path
    }

    readFile = async () => {
        try {

            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataJson)

        } catch (error) {
            return []
        }
    }

    createCarts = async () => {
        try {

            const cartsDB = await this.readFile()
            const products = []
            const carts = {
                products
            }

            if (cartsDB.length === 0) {

                carts.id = 1

            } else {
                carts.id = cartsDB[cartsDB.length - 1].id + 1
            }

            cartsDB.push(carts)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsDB, null, '\t'), 'utf-8')
            return carts

        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (cid) => {
        try {

            if (!cid) return 'Ingrese un Id'

            const cartsDB = await this.readFile()
            const cartFound = cartsDB.find(cart => cart.id === cid)

            if (!cartFound) return 'No se encontro un carrito con ese ID'

            return cartFound

        } catch (error) {
            console.log(error)
        }
    }

    addProductsToCart = async (cid, product) => {
        try {

            if (!cid) return 'Ingrese el Id del carrito'
            if (!product) return 'Ingrese un producto'

            const cartsDB = await this.readFile()
            const cart = cartsDB.find(cart => cart.id === cid)
            const productFound = cartsDB.find(carts => carts.products === product)

            if (!cart) return 'No se encontro un carrito con ese ID'

            if(!productFound) {
                cart.products.push(product);
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(cartsDB, null, '\t'), 'utf-8')
            return cart

        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsManager