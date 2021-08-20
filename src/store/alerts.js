const state = {
  alerts: [], // alerts
};

const mutations = {
  ADD_ALERT(state, alert) {
    state.alerts = [...state.alerts, alert];
  },
  CLEAR_ALERT(state, id) {
    state.alerts = state.alerts.filter((alert) => alert.id !== id);
  },
};

const actions = {
  addAlert({ commit, dispatch }, { type, text, timeout = 2500 }) {
    const id = Date.now();
    commit("ADD_ALERT", { type, text, timeout, id });
    setTimeout(() => dispatch("clearAlert", id), timeout);
  },
  clearAlert({ commit }, id) {
    commit("CLEAR_ALERT", id);
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
