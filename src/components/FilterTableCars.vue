<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

interface FormFilter {
  brand: string
  model: string
  year: string
  price: string
}

const formFilter: FormFilter = reactive({
  brand: '',
  model: '',
  year: '',
  price: ''
})

const loading = ref<boolean>(false)

const emit = defineEmits(['submit'])

const submit = () => {
  loading.value = true
  emit('submit', formFilter)
  loading.value = false
}
const clearFilds = () => {
  formFilter.brand = ''
  formFilter.model = ''
  formFilter.price = ''
  formFilter.year = ''
  loading.value = true
  emit('submit', formFilter)
  loading.value = false
}
const disabledButtonClear = computed(() => {
  const disabled =
    formFilter.brand !== '' ||
    formFilter.model !== '' ||
    formFilter.price !== '' ||
    formFilter.year !== ''
      ? false
      : true

  return disabled
})
</script>
<template>
  <div class="filter-table-cars">
    <Panel header="Filtrar veículos" toggleable>
      <div class="filds-filter">
        <span class="form-input p-input-icon-left p-float-label">
          <i class="pi pi-search" />
          <InputText v-model="formFilter.brand" />
          <label for="brand">Marca</label>
        </span>

        <span class="form-input p-input-icon-left p-float-label">
          <i class="pi pi-search" />
          <InputText v-model="formFilter.model" />
          <label for="model">Modelo</label>
        </span>

        <span class="form-input p-input-icon-left p-float-label">
          <i class="pi pi-search" />
          <InputText v-model="formFilter.year" />
          <label for="year">Ano</label>
        </span>

        <span class="form-input p-input-icon-left p-float-label">
          <i class="pi pi-search" />
          <InputText v-model="formFilter.price" />
          <label for="price">Preço</label>
        </span>
        <Button
          class="filter-btn"
          @click="submit"
          :loading="loading"
          icon="pi pi-search"
          severity="info"
          raised
        />
        <Button
          :disabled="disabledButtonClear"
          @click="clearFilds"
          icon="pi pi-times"
          severity="secondary"
          raised
        />
      </div>
    </Panel>
  </div>
</template>
<style scoped lang="scss">
.filter-table-cars {
  border-radius: 10px;
  padding: 5px;
  background-color: var(--bg);
  margin-bottom: 10px;
}
.filds-filter {
  margin: 15px 0 15px 0;
  display: flex;

  align-items: center;
  flex-flow: wrap;
}

.form-input {
  margin-right: 10px;
}
.filter-btn {
  margin-right: 10px;
}
</style>
