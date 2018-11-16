import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
// import VueRouter from 'vue-router'
import router from './router/index';


// Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.use(ElementUI, {locale})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })