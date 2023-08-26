<script lang="ts" setup>
import { ref, watch } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface Cars {
  brand: string
  model: string
  year: string
  price: string
}

const props = defineProps<{
  value: Cars[]
  totalRecords: number
  lazy: boolean
  paginator: boolean
  loading: boolean
  rows: number
}>()

const emit = defineEmits(['onPage', 'selectedCar'])

const selectedCar = ref()

watch(
  () => selectedCar.value,
  () => {
    emit('selectedCar', selectedCar.value)
  }
)
const formatCurrency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
</script>
<template>
  <div class="container-table-cars">
    <DataTable
      v-if="props.value"
      filterDisplay="row"
      :value="props.value"
      :totalRecords="totalRecords"
      :lazy="lazy"
      :paginator="paginator"
      :loading="loading"
      :rows="10"
      @page="emit('onPage', $event)"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="{totalRecords} Veículo(s)"
      responsiveLayout="scroll"
      :rowHover="true"
      selectionMode="single"
      :metaKeySelection="true"
      dataKey="_id"
      v-model:selection="selectedCar"
    >
      <Column class="column-table" field="brand" header="Marca"> </Column>
      <Column field="model" header="Modelo"> </Column>
      <Column field="year" header="Ano"> </Column>
      <Column field="price" header="Preço">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<style scoped lang="scss">
.container-table-cars {
  width: 100%;
  max-width: 1182px;
  border: 1px solid var(--default-bg);
  border-radius: 10px;
  padding: 5px;
  background-color: var(--bg);
}
</style>
