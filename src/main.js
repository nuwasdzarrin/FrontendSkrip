import Vue from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
// import BootstrapVue from 'bootstrap-vue'
import {store} from  './stores/store';

//import BootstrapVue from 'bootstrap-vue'

import router from './routers/router';
import header from './layouts/header';
import sidebar from './layouts/sidebar';
import footer from './layouts/footer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/nprogress/nprogress.css';

// Vue.use(VueRouter);
Vue.component('app-header',header);
Vue.component('app-sidebar', sidebar);
Vue.component('app-footer',footer);
Vue.use(VueAxios, axios);
// Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
