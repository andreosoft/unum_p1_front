/** @format */

import axios from '@/config/axios';
import api from '@/config/api';

const state = {
  clinicalRecords: [],
};
const mutations = {
  SET_RECORDS(state, payload) {
    /**
     * данные для теста
     * payload = [...payload, ...fakeRecords]
     */
    state.clinicalRecords = payload;
  },
};
const actions = {
  fetchClinicalRecords({ commit }) {
    return axios.get(api.get_clinical_record).then((res) => {
      commit('SET_RECORDS', res.data.data);
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
