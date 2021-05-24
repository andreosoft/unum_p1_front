import axios from "./../config/axios";
import api from "./../config/api";
import router from "./../router";

const state = {
  authStatus: false,
  userProfile: null,
};

const mutations = {
  SET_AUTH_STATUS(state, status) {
    state.authStatus = status;
  },
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile;
  },
};

const actions = {
  login({ commit, dispatch }, { email, password }) {
    return axios.post(api.get_token, { login: email, password }).then((res) => {
      if (res.data.status === "error") {
        dispatch(
          "alerts/addAlert",
          {
            type: "error",
            text: res.data.error,
          },
          { root: true }
        );
        return;
      }
      commit("SET_AUTH_STATUS", true);
      window.localStorage.setItem(
        "neomedy",
        JSON.stringify({
          login: res.data.data.profile.login,
          token: res.data.data.token,
        })
      );
      axios.defaults.headers.common.Authorization = res.data.data.token;
      dispatch("fetchUserProfile");
      router.push({ name: "Home" });
    });
  },
  confirmLogin({ commit, dispatch }, login) {
    return axios.get(api.confirm_login, { params: { login } }).then((res) => {
      if (!res.data.data) {
        dispatch("alerts/addAlert", {
          type: "error",
          text: "Профиль не найден",
        });
        return res.data.data;
      }
      commit("SET_AUTH_STATUS", true);
      dispatch("fetchUserProfile");
      return res.data.data;
    });
  },
  logout({ commit }) {
    commit("SET_AUTH_STATUS", false);
    window.localStorage.clear();
    router.push({ name: "Login" });
    delete axios.defaults.headers.common.Authorization;
    console.log(axios.defaults.headers.common);
  },
  signup({ dispatch }, data) {
    return axios.post(api.patient_registration, data).then(async (res) => {
      await dispatch("login", {
        email: data.user.login,
        password: data.user.password,
      });
      dispatch("fetchUserProfile");
    });
  },
  fetchUserProfile({ commit }) {
    return axios.get(api.get_profile).then((res) => {
      commit("SET_USER_PROFILE", res.data.profile);
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
