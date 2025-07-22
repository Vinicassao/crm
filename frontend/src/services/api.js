import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api' // coloque a URL do seu backend aqui
})

// Adiciona token em todas as requisições
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
