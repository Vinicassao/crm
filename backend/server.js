// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const saleRoutes = require('./routes/saleRoutes')
const reportRoutes = require('./routes/reportRoutes')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/sales', saleRoutes)
app.use('/api/reports', reportRoutes)

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err))

// Rotas de teste
app.get('/', (req, res) => {
  res.send('API do CRM de Doces funcionando')
})

// Inicializar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
