import axios from "./../config/axios";
import api from "./../config/api";

const state = {
  clinicalRecords: [],
};
const mutations = {
  SET_RECORDS(state, payload) {
    // массив из айдишников докторов    
    let doctorsId = [];
    payload.map((record) => {
      doctorsId.push(record.doctor_id);
    });
    doctorsId = [...new Set(doctorsId)];

    // группировка посещений по докторам
    const records = [];
    doctorsId.map((e) => {
      records.push({
        doctor_id: e,
        events: payload.filter((event) => e === event.doctor_id),
      });
    });
    state.clinicalRecords = records;
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
