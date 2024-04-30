import fs from 'node:fs'

class ProductsManager {
    constructor(path) {
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

    addProducts = async (product) => {
        try {

            const productsDB = await this.readFile()

            const productFound = productsDB.find(prod => product.code === prod.code)

            if (productFound) return 'Ya existe el producto'

            if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) return 'Ingrese todos los campos'

            if (productsDB.length === 0) {

                product.id = 1

            } else {
                product.id = productsDB[productsDB.length - 1].id + 1
            }

            productsDB.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsDB, null, '\t'), 'utf-8')
            return product

        } catch (error) {
            console.log(error)
        }
    }

    getProducts = async (limit) => {
        try {

            const productsDB = await this.readFile();

            if (!limit) return productsDB;
            
            const products = productsDB.filter(prod => prod.id <= limit);
            return products;

        } catch (error) {
            console.log(error);
        }
    };

    getProductById = async (pid) => {
        try {
            
            if (!pid) return 'Ingrese un Id'

            const productsDB = await this.readFile()
            const product = productsDB.find(prod => prod.id === pid)

            if (!product) return 'No se encontro un producto con ese ID'

            return product

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (pid, productToUpdate) => {
        try {

            const productsDB = await this.readFile();

            const productIndex = productsDB.findIndex(prod => prod.id === pid);
            if (productIndex === -1) {
                return 'No se encontró un producto con ese ID.';
            }

            const updatedProduct = { ...productsDB[productIndex], ...productToUpdate };
            productsDB[productIndex] = updatedProduct;

            await fs.promises.writeFile(this.path, JSON.stringify(productsDB, null, '\t'), 'utf-8');
            return 'Producto actualizado.';

        } catch (error) {
            console.log(error);
            return 'Ocurrió un error al actualizar el producto.';
        }
    }

    deleteProduct = async (pid) => {

        try {

            const productsDB = await this.readFile();

            const productIndex = productsDB.findIndex(prod => prod.id === pid);

            if (productIndex === -1) {
                return 'No se encontró un producto con ese ID.';
            }

            productsDB.splice(productIndex, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(productsDB, null, '\t'), 'utf-8');
            return 'Producto eliminado.';

        } catch (error) {
            console.log(error);
            return 'Ocurrió un error al eliminar el producto.';
        }
    }
}
export default ProductsManager
