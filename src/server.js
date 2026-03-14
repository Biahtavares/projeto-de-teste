const express = require('express')
const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(express.json())

app.use('/produtos', productRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})