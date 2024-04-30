import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'


const app = express()

const httpServer = app.listen(PORT, error => {
    if (error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})

const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

const main = () => {

    app.use('/', viewsRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)

    app.listen(8080, err => {

        if (err) console.log(err)

        console.log('Escuchando el puerto 8080')
    })
}

main()


