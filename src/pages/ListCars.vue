<script setup lang="ts">
import { reactive, computed, onBeforeMount, ref } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { useCarsStore } from '@/stores/cars'
import TableCars from '@/components/TableCars.vue'
import FilterTableCars from '@/components/FilterTableCars.vue'

interface Pagination {
  page: number
  qtd: number
}

const { $state, getCars } = useCarsStore()
const { alertError } = useAlert()

const pagination: Pagination = reactive({
  page: 1,
  qtd: 5
})

const loading = ref<boolean>(false)

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

onBeforeMount(listCars)
</script>
<template>
  <div class="container-list-cars">
    <div class="block-list-cars">
      <div class="filter-list-cars">
        <FilterTableCars @submit="submitFilter" />
      </div>
      <TableCars
        :value="allCars.data"
        :totalRecords="allCars.total"
        :paginator="true"
        :lazy="true"
        :rows="allCars.qtd"
        @onPage="onPage"
        :loading="loading"
      />
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
</style>
