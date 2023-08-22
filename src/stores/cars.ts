import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiCars } from '@/services/cars'

interface Car {
  brand: string
  model: string
  year: string
  price: string
}

interface ListCars {
  data: Car[]
  page: number
  qtd: number
  total: number
}

export const useCarsStore = defineStore('cars', () => {
  const { getAll } = apiCars()

  const cars = ref<ListCars>({
    data: [],
    page: 1,
    qtd: 10,
    total: 0
  })

  const getCars = async (params: {
    qtd: number
    page: number
    brand?: string
    model?: string
    year?: string
    price?: string
  }) =>
    await getAll(params).then((response) => {
      cars.value = response.data.result
    })

  return { getCars, cars }
})
