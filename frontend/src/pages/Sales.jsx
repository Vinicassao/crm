import { useEffect, useState } from 'react'
import API from '../services/api'

export default function Sales() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetchProducts()
    fetchSales()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products')
      setProducts(res.data)
    } catch (err) {
      console.error('Erro ao carregar produtos', err)
    }
  }

  const fetchSales = async () => {
    try {
      const res = await API.get('/sales')
      setSales(res.data)
    } catch (err) {
      console.error('Erro ao carregar vendas', err)
    }
  }

  const handleSale = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/sales', {
        productId,
        quantity: parseInt(quantity)
      })

      setMessage(`Venda registrada com sucesso: ${res.data.total.toFixed(2)} R$`)
      setProductId('')
      setQuantity(1)
      fetchProducts()
      fetchSales()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao registrar venda'
      setMessage(msg)
    }
  }

  return (
    <div>
      <h2>Registrar Venda</h2>

      <form onSubmit={handleSale}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name} (Estoque: {p.stock}) - R$ {p.price.toFixed(2)}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit">Registrar Venda</button>
      </form>

      {message && <p style={{ marginTop: '10px', color: message.includes('sucesso') ? 'green' : 'red' }}>{message}</p>}

      <hr />
      <h3>Últimas Vendas</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Total (R$)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s._id}>
              <td>{s.product?.name || 'Produto removido'}</td>
              <td>{s.quantity}</td>
              <td>{s.total.toFixed(2)}</td>
              <td>{new Date(s.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
