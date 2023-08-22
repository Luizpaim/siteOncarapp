import Layout from '@/components/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Veículos',
        component: () => import('@/pages/ListCars.vue')
      }
    ]
  }
]
