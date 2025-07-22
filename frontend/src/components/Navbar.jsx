import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!loggedIn) return null

  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/products">Produtos</Link>
      <Link style={styles.link} to="/sales">Vendas</Link>
      <Link style={styles.link} to="/reports">Relatórios</Link>
      <button style={styles.button} onClick={handleLogout}>Sair</button>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    gap: '15px',
    padding: '10px 20px',
    backgroundColor: '#222',
    color: '#fff',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  button: {
    marginLeft: 'auto',
    background: 'crimson',
    border: 'none',
    padding: '6px 12px',
    color: 'white',
    cursor: 'pointer'
  }
}
