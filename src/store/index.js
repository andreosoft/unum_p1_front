import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import alerts from "./alerts";
import events from "./events";
import doctors from "./doctors";
import clinicalRecords from "./clinicalRecords";
import chats from "./chats";
import debounce from "lodash/debounce";

const updateDoctorProfileOn = [
  "SET_USER_PROFILE_NAME",
  "SET_USER_PROFILE_BIRTHDAY",
  "SET_USER_PROFILE_PHONES",
  "SET_USER_PROFILE_EMAIL",
  "SET_USER_PROFILE_LANG",
  "SET_USER_PROFILE_COUNTRY",
];

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth,
    doctors,
    events,
    clinicalRecords,
    alerts,
    chats,
  },
});
const autosaveProgram = debounce(
  () => store.dispatch("auth/updateDoctorProfile"),
  1000,
  { maxWait: 4000 }
);

store.subscribe((mutation) => {
  if (updateDoctorProfileOn.indexOf(mutation.type.split("/")[1]) > -1) {
    autosaveProgram();
  }
});

export default store;
