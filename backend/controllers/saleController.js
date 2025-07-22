const Sale = require('../models/Sale')
const Product = require('../models/Product')

// Registrar uma venda
const createSale = async (req, res) => {
  const { productId, quantity } = req.body

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Estoque insuficiente' })
    }

    const total = product.price * quantity

    // Cria a venda
    const sale = await Sale.create({
      product: productId,
      quantity,
      total
    })

    // Atualiza o estoque
    product.stock -= quantity
    await product.save()

    res.status(201).json(sale)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar venda', error: err.message })
  }
}

// Listar vendas
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('product')
    res.json(sales)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vendas', error: err.message })
  }
}

module.exports = { createSale, getSales }
