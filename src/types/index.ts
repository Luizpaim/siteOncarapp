import { AxiosResponse } from 'axios'

export type ErrorT = {
  result: {
    name: string
    errorDetails: string
  }
  message: string
}

export type ResponseT = {
  result: {
    page: number
    qtd: number
    total: number
    data: any
  }
}

export type ApiResponseT = Promise<AxiosResponse<ResponseT, ErrorT>>
