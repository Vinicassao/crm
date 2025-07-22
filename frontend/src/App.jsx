import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Reports from './pages/Reports'

export default function App() {
  const { authenticated } = useAuth()

  return (
    <>
      {authenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={authenticated ? <Products /> : <Navigate to="/login" />} />
        <Route path="/sales" element={authenticated ? <Sales /> : <Navigate to="/login" />} />
        <Route path="/reports" element={authenticated ? <Reports /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}
