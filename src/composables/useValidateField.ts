import { useField, useForm } from 'vee-validate'

export const useValidateField = () => {
  const { handleSubmit } = useForm()

  const validate = (value: string) => {
    if (!value) return 'obrigatório'
    return true
  }

  const validateField = (fieldName: string) => {
    const { value: fieldValue, errorMessage: fieldErrorMessage } = useField(fieldName, validate)
    return {
      fieldValue,
      fieldErrorMessage
    }
  }

  return {
    validateField,
    handleSubmit
  }
}
