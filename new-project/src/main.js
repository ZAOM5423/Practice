import { createApp } from 'vue'
import './style.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from '@/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App);
const pinia = createPinia();

app.use(BaiduMap, {
    ak: "EroBLYXcRaxjifuLub6zLKIPi10aBH2B"
});
pinia.use(persistedState)
app.use(pinia);
app.use(router);
app.use(Vant);
app.mount('#app');