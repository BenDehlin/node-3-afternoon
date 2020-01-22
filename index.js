require('dotenv').config()
const express = require('express'),
  massive = require('massive'),
  {SERVER_PORT, CONNECTION_STRING} = process.env,
  app = express(),
  productsCtrl = require('./products_controller'),
  productsUrl = '/api/products'
  // cors = require('cors')

app.use(express.json())
// app.use(cors())

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
}).catch(err => console.log(err))

//ENDPOINTS
app.get(productsUrl, productsCtrl.getAll)
app.get(`${productsUrl}/:id`, productsCtrl.getOne)
app.post(productsUrl, productsCtrl.create)
app.put(`${productsUrl}/:id`, productsCtrl.update)
app.delete(`${productsUrl}/:id`, productsCtrl.delete)

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))