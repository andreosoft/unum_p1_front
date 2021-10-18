import dayjs from "dayjs";
import axios from "./../config/axios";
import api from "./../config/api";

const state = {
  events: [],
  eventsFetched: false,
  eventsByDoctor: [],
};

const getters = {
  getEvents(state) {
    return state.events;
  },
  getValidEvents(state) {
    return state.events.filter(
      (event) => dayjs().isBefore(event.start) && event.type_id === 1
    );
  },
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events = [...state.events, event];
  },
  SET_EVENTS_BY_DOCTOR(state, doctorId) {
    const array = state.events.filter((event) => event.doctor_id === doctorId);
    state.eventsByDoctor = array;
  },
  DELETE_EVENT(state, id) {
    state.events = state.events.filter((event) => event.id !== id);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_FETCHED(state, value) {
    state.eventsFetched = value;
  },
};

const actions = {
  addEvent({ commit, dispatch }, event) {
    return axios.post(api.set_event, event).then((res) => {
      commit("ADD_EVENT", res.data.data);
      dispatch(
        "alerts/addAlert",
        {
          type: "success",
          text: "Вы записались на прием к этому врачу",
        },
        { root: true }
      );
      dispatch("doctors/fetchMyDoctors", {}, { root: true });
    });
  },
  fetchEvents({ commit }) {
    return axios.get(api.get_events).then((res) => {
      commit("SET_EVENTS", res.data.data);
      commit("SET_EVENTS_FETCHED", true);
    });
  },
  deleteEvent({ commit, dispatch }, { eventId, doctorId }) {
    return axios.delete(api.delete_event + eventId).then((res) => {
      commit("DELETE_EVENT", eventId);
      dispatch(
        "alerts/addAlert",
        {
          type: "success",
          text: "Запись успешно удалена",
        },
        { root: true }
      );

      dispatch("doctors/fetchDoctorSchedule", doctorId, { root: true });
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
