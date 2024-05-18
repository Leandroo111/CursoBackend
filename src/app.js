import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import ProductsManager from './managers/productManager.js'
import { Server } from 'socket.io'
import { serverSocket } from './utils/serverSocket.js'
import { __dirname } from './utils.js'



const app = express()

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, error => {

    if (error) console.log(error)
    console.log(`Server escuchando en el puerto ${PORT}`)

})

const io = new Server(httpServer)

function productSocket(io) {
    return (req, res, next) => {
        req.io = io
        next()
    }
}

const productsPath = './src/file/products.json'
const products = new ProductsManager(productsPath)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use(serverSocket(io))
app.use(productSocket(io))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')



const main = () => {

    app.use('/', viewsRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)

}

main()


