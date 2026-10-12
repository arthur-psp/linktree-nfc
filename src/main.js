import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vuetify } from './plugins/vuetify.js'
import { setWasmUrl } from '@lottiefiles/dotlottie-vue'

setWasmUrl('/dotlottie-player.wasm')

createApp(App).use(vuetify).mount('#app')
