import { useEffect, useState } from 'react'
import API from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', stock: '', id: null })

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products')
      setProducts(res.data)
    } catch (err) {
      console.error('Erro ao buscar produtos', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.id) {
        await API.put(`/products/${form.id}`, {
          name: form.name,
          price: parseFloat(form.price),
          stock: parseInt(form.stock)
        })
      } else {
        await API.post('/products', {
          name: form.name,
          price: parseFloat(form.price),
          stock: parseInt(form.stock)
        })
      }
      setForm({ name: '', price: '', stock: '', id: null })
      fetchProducts()
    } catch (err) {
      console.error('Erro ao salvar produto', err)
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      id: product._id
    })
  }

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      try {
        await API.delete(`/products/${id}`)
        fetchProducts()
      } catch (err) {
        console.error('Erro ao excluir produto', err)
      }
    }
  }

  return (
    <div>
      <h2>Produtos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button type="submit">
          {form.id ? 'Atualizar' : 'Cadastrar'}
        </button>
        {form.id && (
          <button type="button" onClick={() => setForm({ name: '', price: '', stock: '', id: null })}>
            Cancelar
          </button>
        )}
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço (R$)</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.price.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>✏️</button>
                <button onClick={() => handleDelete(prod._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
