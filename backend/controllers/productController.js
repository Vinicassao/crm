const Product = require('../models/Product')

// Criar produto
const createProduct = async (req, res) => {
  const { name, price, stock } = req.body

  try {
    const newProduct = await Product.create({ name, price, stock })
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar produto', error: err.message })
  }
}

// Listar todos os produtos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message })
  }
}

// Buscar 1 produto
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: err.message })
  }
}

// Atualizar produto
const updateProduct = async (req, res) => {
  const { name, price, stock } = req.body

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock },
      { new: true }
    )

    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message })
  }
}

// Deletar produto
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' })
    res.json({ message: 'Produto deletado com sucesso' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: err.message })
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}
