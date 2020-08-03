import express from 'express'
const app = express()
const port = process.env.PORT
const hostname = '127.0.0.1';

import { registerRoutes } from './routes'
import { setEnvironment } from './config/env'
import { connectToDB } from './config/db'

setEnvironment(app)
connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
    if(process.env.NODE_ENV !== 'production') {
        return res.send(
            'Running server in development mode.'
        )
    } else {
        return res.sendFile('index.html', { root: __dirname + '/../dist/'})
    }
})

app.listen(port, () => {
  console.log(`Mevn Stack app listening at http://${hostname}:${port} in ${process.env.NODE_ENV}`)
})