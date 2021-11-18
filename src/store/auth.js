import axios from "./../config/axios";
import api from "./../config/api";
import router from "./../router";

const state = {
  authStatus: false,
  userProfile: null,
  isProfileUpdating: false,
};

const mutations = {
  SET_AUTH_STATUS(state, status) {
    state.authStatus = status;
  },
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile;
  },
  SET_USER_PROFILE_NAME(state, name) {
    state.userProfile.name = name;
  },
  SET_USER_PROFILE_BIRTHDAY(state, date) {
    state.userProfile.birthday = date;
  },
  SET_USER_PROFILE_PHONES(state, phone) {
    state.userProfile.phones = phone;
  },
  SET_USER_PROFILE_PHOTO(state, photo) {
    state.userProfile.photo = photo;
  },
  SET_USER_PROFILE_EMAIL(state, email) {
    state.userProfile.email = email;
  },
  SET_USER_PROFILE_LANG(state, lang) {
    state.userProfile.lang = lang;
  },
  SET_USER_PROFILE_COUNTRY(state, country) {
    state.userProfile.country = country;
  },
  SET_PROFILE_UPDATING_STATE(state, value) {
    state.isProfileUpdating = value;
  },
};

const actions = {
  login({ commit, dispatch }, { email, password }) {
    return axios.post(api.get_token, { login: email, password }).then((res) => {
      if (res.data.status === "error" || res.data.data.profile.role !== 1) {
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
      commit("SET_AUTH_STATUS", true);
      return res.data.data;
    });
  },
  logout({ commit }) {
    commit("SET_AUTH_STATUS", false);
    window.localStorage.clear();
    router.push({ name: "Login" });
    delete axios.defaults.headers.common.Authorization;
  },
  signup({ dispatch }, data) {
    return dispatch("confirmLogin", data.user.login).then((status) => {
      if (!status) {
        return axios.post(api.patient_registration, data).then(async (res) => {
          await dispatch("login", {
            email: data.user.login,
            password: data.user.password,
          });
          dispatch("fetchUserProfile");
        });
      }
      dispatch(
        "alerts/addAlert",
        {
          type: "error",
          text: "Данный Email уже занят",
        },
        {
          root: true,
        }
      );
    });
  },
  fetchUserProfile({ commit, dispatch }) {
    return axios.get(api.get_profile).then((res) => {
      try {
        commit("SET_USER_PROFILE", res.data.data);
      } catch (err) {
        dispatch(
          "alerts/addAlert",
          {
            type: "error",
            text: "Профиль не найден",
          },
          {
            root: true,
          }
        );
        window.localStorage.clear();
        router.push({ name: "Login" });
      }
    });
  },
  updateProfile({ state, commit, dispatch }) {
    console.log("saving...");
    commit("SET_PROFILE_UPDATING_STATE", true);
    return axios.post(api.update_profile, state.userProfile).then(() => {
      commit("SET_PROFILE_UPDATING_STATE", false);
      dispatch("fetchUserProfile");
      console.log("saved");
    });
  },
  uploadUserImage({commit}) {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(api.postImage, formData).then((res) => {
      console.log(res)
      commit('SET_USER_PROFILE_PHOTO', res.data.data.file)
    });
  }
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
