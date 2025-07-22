const express = require('express')
const router = express.Router()
const {
  getSalesSummary,
  getDailyReport,
  getTopProducts
} = require('../controllers/reportController')

const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/summary', getSalesSummary)
router.get('/daily', getDailyReport)
router.get('/top-products', getTopProducts)

module.exports = router
