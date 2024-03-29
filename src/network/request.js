import axios from 'axios';
import $store from '@/store/index';

import { install } from 'vuex';
let ajaxTimer = 0;
export function request(config) {
  $store.commit('showLoading');
  const install = axios.create({
    baseURL: 'http://1.15.24.13:3000/',
    timeout: 5000,
  });
  install.interceptors.request.use(
    (data) => {
      ajaxTimer++;
      return data;
    },
    (err) => {
      return err;
    }
  );
  install.interceptors.response.use(
    (data) => {
      ajaxTimer--;
      if (ajaxTimer === 0) $store.commit('hiddenLoading');
      return data;
    },
    (err) => {
      return err;
    }
  );

  setTimeout(() => {
    $store.commit('hiddenLoading');
  }, 6000);

  return install(config);
}
