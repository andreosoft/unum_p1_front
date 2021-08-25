import axios from "./../config/axios";
import api from "./../config/api";
const state = {
  doctors: [],
  doctorsFetched: false,
  selectedDoctor: null,
  selectedDoctorFetched: false,
  doctorSchedule: {},
};
const getters = {
  getDoctorsList(state) {
    return state.doctors;
  },
  getSelectedDoctor(state) {
    return state.selectedDoctor;
  },
  getDoctorSchedule(state) {
    return state.doctorSchedule;
  },
  getDoctorName: (state) => (doctorId) => {
    const doctor = state.doctors.filter((doc) => doc.id === doctorId);
    if (doctor.length) {
      return doctor[0].name;
    }
    return undefined;
  },
  getPhotoURL: () => (imageId) => {
    return api.get_photo + `/${imageId}`;
  },
  getDoctorSpecialty: (state) => (doctorId) => {
    const doctor = state.doctors.filter((doc) => doc.id === doctorId);
    try {
      if (!doctor[0] || !doctor[0].info.doctor_specialty) throw Error;
      return doctor[0].info.doctor_specialty.toLowerCase();
    } catch (err) {
      return "";
    }
  },
};
const mutations = {
  SET_DOCTORS(state, doctors) {
    state.doctors = doctors;
  },
  SET_DOCTORS_FETCHED(state, value) {
    state.doctorsFetched = value;
  },
  SET_SELECTED_DOCTOR(state, doctor) {
    state.selectedDoctor = doctor;
  },
  SET_SELECTED_DOCTOR_FETCHED(state, value) {
    state.selectedDoctorFetched = value;
  },
  SET_DOCTOR_SCHEDULE(state, schedule) {
    state.doctorSchedule = schedule;
  },
};
const actions = {
  fetchDoctors({ commit, dispatch }) {
    return axios.get(api.all_doctors).then((res) => {
      commit("SET_DOCTORS", res.data.data);
      commit("SET_DOCTORS_FETCHED", true);
      return res;
    });
  },
  fetchDoctorById({ commit, dispatch }, id) {
    return axios.get(api.single_doctor + id).then((res) => {
      commit("SET_SELECTED_DOCTOR", res.data.data);
      // setTimeout(() => {
      commit("SET_SELECTED_DOCTOR_FETCHED", true);
      // dispatch(
      //   "alerts/addAlert",
      //   {
      //     color: "success",
      //     text: "Информация о докторе загружена",
      //   },
      //   { root: true }
      // );
      // }, 1500);
    });
  },
  fetchDoctorSchedule({ commit }, doctorId) {
    return axios.get(api.doctor_schedule + doctorId).then((res) => {
      if (res.data.data) {
        commit("SET_DOCTOR_SCHEDULE", res.data.data.schedule);
        return;
      }
      commit("SET_DOCTOR_SCHEDULE", {});
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
