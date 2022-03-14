/** @format */

import axios from 'axios';
import store from './../store';

const localStorage = JSON.parse(window.localStorage.getItem('neomedy')) || '';

axios.defaults.baseURL = 'https://api.neomedy.com/api';
axios.defaults.headers.common['Authorization'] = localStorage.token;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      store.dispatch('auth/logout');
    }
  }
);

export default axios;
