import { useToast } from 'primevue/usetoast'
import { ErrorT } from '@/types'

export const useAlert = () => {
  const { add } = useToast()

  const alertSucess = (detail: string, life: number, summary?: string) =>
    add({ severity: 'success', detail: detail, life: life })

  const alertError = (error: ErrorT, life: number) =>
    add({ severity: 'error', detail: error.result.errorDetails, life: life })

  const alertWarn = (detail: string, life: number, summary?: string) =>
    add({ severity: 'warn', summary: summary, detail: detail, life: life })

  return {
    alertSucess,
    alertError,
    alertWarn
  }
}
