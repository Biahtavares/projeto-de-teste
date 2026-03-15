const express = require('express')
const productRoutes = require('./routes/productRoutes')

const app = express()

// [ Static Files ]
app.use(express.static('public'))

app.use(express.json())

app.use('/produtos', productRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})