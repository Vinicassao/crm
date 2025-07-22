import { useEffect, useState } from 'react'
import API from '../services/api'

export default function Reports() {
  const [sales, setSales] = useState([])
  const [totals, setTotals] = useState({ totalRevenue: 0, totalSales: 0 })
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    try {
      const res = await API.get('/sales')
      const allSales = res.data

      setSales(allSales)

      const totalRevenue = allSales.reduce((acc, s) => acc + s.total, 0)
      const totalSales = allSales.length

      // Agrupar por produto
      const grouped = {}
      allSales.forEach(sale => {
        const name = sale.product?.name || 'Removido'
        grouped[name] = (grouped[name] || 0) + sale.quantity
      })

      const topProducts = Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .map(([name, qty]) => ({ name, qty }))

      setTotals({ totalRevenue, totalSales })
      setTopProducts(topProducts)

    } catch (err) {
      console.error('Erro ao gerar relatório', err)
    }
  }

  return (
    <div>
      <h2>Relatório de Vendas 📈</h2>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Total de Vendas:</strong> {totals.totalSales}</p>
        <p><strong>Faturamento Total:</strong> R$ {totals.totalRevenue.toFixed(2)}</p>
      </div>

      <h3>Produtos Mais Vendidos</h3>
      <ul>
        {topProducts.map((p, i) => (
          <li key={i}>
            {p.name} — {p.qty} unidade{p.qty > 1 ? 's' : ''}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Histórico de Vendas</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Data</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s._id}>
              <td>{new Date(s.date).toLocaleDateString()}</td>
              <td>{s.product?.name || 'Removido'}</td>
              <td>{s.quantity}</td>
              <td>{s.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
