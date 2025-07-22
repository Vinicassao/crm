import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Navbar from './components/Navbar' // ✅ Importando a Navbar

const isAuthenticated = () => !!localStorage.getItem('token')

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar só aparece se autenticado */}
      {isAuthenticated() && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={isAuthenticated() ? <Products /> : <Navigate to="/login" />} />
        <Route path="/sales" element={isAuthenticated() ? <Sales /> : <Navigate to="/login" />} />
        <Route path="/reports" element={isAuthenticated() ? <Reports /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
