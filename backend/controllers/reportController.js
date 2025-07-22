const Sale = require('../models/Sale')
const Product = require('../models/Product')

// Relatório geral
const getSalesSummary = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          totalQuantity: { $sum: "$quantity" },
          totalSales: { $sum: 1 }
        }
      }
    ])

    res.json(sales[0] || {
      totalRevenue: 0,
      totalQuantity: 0,
      totalSales: 0
    })
  } catch (err) {
    res.status(500).json({ message: 'Erro no relatório', error: err.message })
  }
}

// Relatório por dia
const getDailyReport = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalRevenue: { $sum: "$total" },
          totalQuantity: { $sum: "$quantity" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } } // data decrescente
    ])

    res.json(sales)
  } catch (err) {
    res.status(500).json({ message: 'Erro no relatório diário', error: err.message })
  }
}

// Produtos mais vendidos
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$total" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      { $sort: { totalQuantity: -1 } }
    ])

    res.json(topProducts)
  } catch (err) {
    res.status(500).json({ message: 'Erro no relatório de produtos', error: err.message })
  }
}

module.exports = {
  getSalesSummary,
  getDailyReport,
  getTopProducts
}
