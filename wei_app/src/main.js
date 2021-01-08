import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './lib/mui/dist/css/mui.css'
import './lib/mui/dist/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import './assets/css/base.css'
import './assets/css/index.scss'
import VuePreview from 'vue-preview';
import mui from './lib/mui/dist/js/mui'
Vue.use(VuePreview);
Vue.use(MintUI)
Vue.prototype.$mui = mui;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
