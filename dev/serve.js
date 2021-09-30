import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import DeskUi from '@/entry.esm';
Vue.use(DeskUi);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'es',
  messages:{
    es:{
      linkLabel:'Hola mundo'
    }
  }
})
Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(Dev),
}).$mount('#app');
