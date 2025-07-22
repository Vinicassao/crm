const express = require('express')
const router = express.Router()
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')

const authMiddleware = require('../middleware/authMiddleware')

// Todas as rotas protegidas por JWT
router.use(authMiddleware)

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
