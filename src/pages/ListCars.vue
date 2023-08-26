<script setup lang="ts">
import { reactive, computed, onBeforeMount, ref } from 'vue'

import { useAlert } from '@/composables/useAlert'
import { useCarsStore } from '@/stores/cars'
import { useLeadsStore } from '@/stores/leads'

import TableCars from '@/components/TableCars.vue'
import FilterTableCars from '@/components/FilterTableCars.vue'
import FormLead from '@/components/FormLead.vue'

interface Pagination {
  page: number
  qtd: number
}

const { postLead } = useLeadsStore()
const { $state, getCars } = useCarsStore()
const { alertError, alertSucess, alertWarn } = useAlert()

const pagination: Pagination = reactive({
  page: 1,
  qtd: 10
})

const loading = ref<boolean>(false)
const idCard = ref<string>('')
const openDialog = ref<boolean>(false)

const allCars = computed(() => $state.cars)

const listCars = async () => {
  loading.value = true
  await getCars(pagination)
  loading.value = false
}

const onPage = (event: any) => {
  pagination.page = event.page + 1
  pagination.qtd = event.rows
  listCars()
}

const submitFilter = async (event: any) => {
  try {
    await getCars(event)
  } catch (error: any) {
    alertError(error.response.data, 3000)
  }
}

const openForm = (event: any) => {
  idCard.value = event._id
  openDialog.value === false ? (openDialog.value = true) : (openDialog.value = false)
}

const subimitLead = async (event: any) => {
  try {
    await postLead(event)
    alertSucess('Recebemos seus dados, aguarde nosso contato!', 3000)
  } catch (error: any) {
    alertWarn(error.response.data, 3000)
  }
}

onBeforeMount(listCars)
</script>
<template>
  <div class="container-list-cars">
    <div class="block-list-cars">
      <div class="filter-list-cars">
        <FilterTableCars @onSubmit="submitFilter" />
      </div>
      <TableCars
        :value="allCars.data"
        :totalRecords="allCars.total"
        :paginator="true"
        :lazy="true"
        :rows="allCars.qtd"
        :loading="loading"
        @onPage="onPage"
        @selectedCar="openForm"
      />
      <FormLead @onSubmit="subimitLead" :openDialod="openDialog" :idCar="idCard" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container-list-cars {
  background: var(--bg2);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.block-list-cars {
  width: 100%;
  max-width: 1182px;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .block-list-cars {
    width: 90%;
  }
}

@media screen and (min-width: 481px) and (max-width: 767px) {
  .block-list-cars {
    width: 90%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .block-list-cars {
    width: 90%;
  }
}
</style>
