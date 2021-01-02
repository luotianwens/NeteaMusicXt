import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugin from './assets/common/tool';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
// Object.keys(wait).forEach((key) => {
//   Vue.prototype[`$${key}`] = wait[key];
// });

// Vue.mixin(mixins);

Vue.use(plugin);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
