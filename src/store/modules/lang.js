/** @format */

import axios from '@/config/axios';
import api from '@/config/api';

const state = {
  doctor: {},
  common: {},
};
const getters = {
  getDoctorTranslation: (state) => (key) => {
    let k = key.toLowerCase();
    return state.doctor[k] ? state.doctor[k] : state.common[k] ? state.common[k] : `${key}`;
  },
  getCommonTranslation: (state) => (key) => {
    let k = key.toLowerCase();
    return state.common[k] ? state.common[k] : `${key}`;
  },
};
const mutations = {
  SET_CURRENT_LANG_ITEMS(state, { data, type }) {
    data = Object.entries(data).reduce((a, [key, value]) => {
      a[key.toLowerCase()] = value;
      return a;
    }, {});
    state[type] = data;
  },
};
const actions = {
  fetchLangItems({ commit, state }, { lang, type }) {
    if (lang === '') lang = 'ru';
    return axios.get(api.getLangItems + `/${lang}/${type}`).then((res) => {
      commit('SET_CURRENT_LANG_ITEMS', { data: res.data.data, type });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
