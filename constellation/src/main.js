import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MintUI from 'mint-ui'
import './assets/base2.css'
import './lib/mui/dist/css/mui.css'
import './lib/mui/dist/css/icons-extra.css'
import 'mint-ui/lib/style.css'
import { DatetimePicker } from "mint-ui";

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(MintUI)
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
