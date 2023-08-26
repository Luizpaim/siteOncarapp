import { useToast } from 'primevue/usetoast'
import { ErrorT } from '@/types'

export const useAlert = () => {
  const { add } = useToast()

  const alertSucess = (detail: string, life: number, summary?: string) =>
    add({ severity: 'success', detail: detail, life: life })

  const alertError = (error: ErrorT, life: number) =>
    add({ severity: 'error', detail: error.result.errorDetails, life: life })

  const alertWarn = (error: ErrorT, life: number) =>
    add({ severity: 'warn', detail: error.result.errorDetails, life: life })

  return {
    alertSucess,
    alertError,
    alertWarn
  }
}
