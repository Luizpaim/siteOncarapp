import { api } from './api'
import { ApiResponseT } from '@/types'

export const apiLeads = () => {
  const post = async (body: {
    idCar: string
    brand: string
    model: string
    year: string
    price: string
  }): ApiResponseT => api.post('lead/register', body)

  return {
    post
  }
}
