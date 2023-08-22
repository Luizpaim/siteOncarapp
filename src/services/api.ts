import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
