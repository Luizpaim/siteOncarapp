import '@/assets/app.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import "primeicons/primeicons.css";
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import AOS from 'aos'

import App from '@/App.vue'
import router from '@/router'

import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue)
app.use(ToastService)
AOS.init()

app.directive('tooltip', Tooltip)

app.component('Layout', Layout)
app.component('Button', Button)
app.component('Toast', Toast)

app.mount('#app')
