import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importa os estilos do Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ícones opcionais


const vuetify = createVuetify({ theme: { themes: { colors: { 
  dark: true,
  colors: {
    primary: '#a5d6a7',
    secondary:'#81c784',
    background:'#303030',
  }
 } 
} } }) 

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
