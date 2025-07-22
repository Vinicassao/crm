const express = require('express')
const router = express.Router()
const { createSale, getSales } = require('../controllers/saleController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.post('/', createSale)
router.get('/', getSales)

module.exports = router
