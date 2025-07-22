import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post('/auth/login', { email, password })
      const token = res.data.token

      localStorage.setItem('token', token)
      navigate('/dashboard') // ✅ Redirecionar após login (ou "dashboard")
  } catch (err) {
    console.error('Erro no login:', err)
    const message = err?.response?.data?.message || 'Credenciais inválidas'
    setError(message)
  }
}


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
