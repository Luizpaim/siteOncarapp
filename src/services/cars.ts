import { api } from './api'
import { ApiResponseT } from '@/types'

export const apiCars = () => {
  const getAll = async (params: {
    qtd:number
    page:number
    brand?: string
    model?: string
    year?: string
    price?: string
  }): ApiResponseT => await api.get('car/get-all', { params })

  return {
    getAll
  }
}
