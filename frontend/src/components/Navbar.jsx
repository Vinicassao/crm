import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/products')}>Produtos</button>
      <button onClick={() => navigate('/sales')}>Vendas</button>
      <button onClick={() => navigate('/reports')}>Relatórios</button>
      <button onClick={handleLogout}>Sair</button>
    </nav>
  )
}
