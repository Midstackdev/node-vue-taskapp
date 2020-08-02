import express from 'express'
const app = express()
const port = 5100
const hostname = '127.0.0.1';

import { registerRoutes } from './routes'

registerRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World people!')
})

app.listen(port, () => {
  console.log(`Mevn Stack app listening at http://${hostname}:${port}`)
})