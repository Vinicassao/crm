import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuthenticated(!!token)
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    setAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

