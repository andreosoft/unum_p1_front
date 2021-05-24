import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import alerts from './alerts'
import events from './events'
import doctors from './doctors'
import clinicalRecords from './clinicalRecords'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    doctors,
    events,
    clinicalRecords,
    alerts,
  },
});
