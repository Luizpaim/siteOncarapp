import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiLeads } from '@/services/leads'

export const useLeadsStore = defineStore('leads', () => {
  const { post } = apiLeads()

  const lead = ref()

  const postLead = async (body: { brand: string; model: string; year: string; price: string }) =>
    await post(body).then((response) => (lead.value = response.data))

  return { postLead, lead }
})
