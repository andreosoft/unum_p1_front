import axios from "./../config/axios";
import api from "./../config/api";
// данные для теста
/**
 * const fakeRecords = [
  {
    content: null,
    createdon: "2021-05-30 13:00:00",
    data:
      '{"diagnos":"первичный диагноз от доктора 32","description":"test","recomendations":"test"}',
    doctor_id: 32,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 1,
  },
  {
    content: null,
    createdon: "2021-05-30 15:57:36",
    data:
      '{"diagnos":"вторичный диагноз от доктора 32","description":"test","recomendations":"test"}',
    doctor_id: 32,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 2,
  },
  {
    content: null,
    createdon: "2021-05-30 10:57:36",
    data:
      '{"diagnos":"вторичный диагноз от доктора 32","description":"test","recomendations":"test"}',
    doctor_id: 32,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 2,
  },
  {
    content: null,
    createdon: "2021-05-30 09:57:36",
    data:
      '{"diagnos":"первычный диагноз от доктора 5","description":"test","recomendations":"test"}',
    doctor_id: 5,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 1,
  },
  {
    content: null,
    createdon: "2021-05-30 14:57:36",
    data:
      '{"diagnos":"вторичный диагноз от доктора 5","description":"test","recomendations":"test"}',
    doctor_id: 5,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 2,
  },
  {
    content: null,
    createdon: "2021-05-30 16:57:36",
    data:
      '{"diagnos":"вторичный диагноз от доктора 5","description":"test","recomendations":"test"}',
    doctor_id: 5,
    files: null,
    id: 35,
    patient_id: 68,
    status_id: 1,
    type_id: 2,
  },
];
 */

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
      commit("SET_RECORDS", res.data.data);
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
