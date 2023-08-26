<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'

import { useValidateField } from '@/composables/useValidateField'

interface FormLead {
  idCar: string
  name: string
  email: string
  contact: string
}

const props = defineProps<{
  openDialod: boolean
  idCar: string
}>()

const emit = defineEmits(['onSubmit'])

const openDialog = ref<boolean>(false)
const loading = ref<boolean>(false)

watch(
  () => props.openDialod,
  () => {
    openDialog.value === true ? (openDialog.value = false) : (openDialog.value = true)
  }
)

const { handleSubmit, validateField } = useValidateField()

const fieldName = ref(validateField('name'))
const fieldEmail = ref(validateField('email'))
const fieldContact = ref(validateField('contact'))

watch(
  () => openDialog.value,
  () => {
    if (!openDialog.value) {
      fieldName.value.fieldValue = ''
      fieldEmail.value.fieldValue = ''
      fieldContact.value.fieldValue = ''
    }
  }
)

const formLead = computed((): FormLead => {
  const formLead = {
    idCar: props.idCar,
    name: fieldName.value.fieldValue,
    email: fieldEmail.value.fieldValue,
    contact: fieldContact.value.fieldValue
  }
  return formLead
})

const onSubmit = handleSubmit(async () => {
  loading.value = true
  emit('onSubmit', formLead.value)
  openDialog.value = false
  loading.value = false
})
</script>
<template>
  <Dialog
    :breakpoints="{ '480px': '90%' }"
    position="center"
    v-model:visible="openDialog"
    :style="{ width: '450px' }"
    :modal="true"
    :closable="true"
    class="dialog-form"
  >
    <div class="block-form-lead">
      <img class="logo-form" src="../assets/images/logo-default.png" alt="OnCar" />
      <form @submit="onSubmit" class="form-lead">
        <div class="field">
          <span class="p-float-label">
            <InputText
              class="p-inputtext-lg"
              id="name"
              v-model="fieldName.fieldValue"
              type="text"
              :class="{ 'p-invalid': fieldName.fieldErrorMessage }"
              aria-describedby="name-error"
            />
            <label for="name">Nome</label>
          </span>
          <small class="p-error" id="name-error">{{
            fieldName.fieldErrorMessage || '&nbsp;'
          }}</small>
        </div>
        <div class="field">
          <span class="p-float-label">
            <InputText
              class="p-inputtext-lg"
              id="email"
              v-model="fieldEmail.fieldValue"
              type="email"
              :class="{ 'p-invalid': fieldEmail.fieldErrorMessage }"
              aria-describedby="email-error"
            />
            <label for="email">E-mail</label>
          </span>
          <small class="p-error" id="email-error">{{
            fieldEmail.fieldErrorMessage || '&nbsp;'
          }}</small>
        </div>
        <div class="field">
          <span class="p-float-label">
            <InputMask
              mask="(99) 99999-9999"
              class="p-inputtext-lg"
              id="contact"
              v-model="fieldContact.fieldValue"
              type="text"
              :class="{ 'p-invalid': fieldContact.fieldErrorMessage }"
              aria-describedby="contact-error"
            />
            <label for="contact">Contato</label>
          </span>
          <small class="p-error" id="contact-error">{{
            fieldContact.fieldErrorMessage || '&nbsp;'
          }}</small>
        </div>
        <Button :loading="loading" class="btn" size="large" raised type="submit" label="Enviar" />
      </form>
    </div>
  </Dialog>
</template>
<style scoped lang="scss">
.block-form-lead {
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.field {
  margin-bottom: 25px;
  width: 100%;
}
.p-inputtext-lg,
.btn {
  width: 100%;
}
.logo-form {
  width: 300px;
  margin-bottom: 25px;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .logo-form {
    width: 90%;
  }
}
</style>
