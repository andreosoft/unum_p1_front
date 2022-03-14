/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import alerts from './modules/alerts';
import events from './modules/events';
import doctors from './modules/doctors';
import clinicalRecords from './modules/clinicalRecords';
import chats from './modules/chats';
import lang from './modules/lang';
import debounce from 'lodash/debounce';

const updateProfileOn = ['SET_USER_PROFILE_NAME', 'SET_USER_PROFILE_BIRTHDAY', 'SET_USER_PROFILE_PHONES', 'SET_USER_PROFILE_PHOTO', 'SET_USER_PROFILE_EMAIL', 'SET_USER_PROFILE_LANG', 'SET_USER_PROFILE_COUNTRY'];

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth,
    doctors,
    events,
    clinicalRecords,
    alerts,
    chats,
    lang,
  },
});
const autosaveProgram = debounce(() => store.dispatch('auth/updateProfile'), 1000, { maxWait: 4000 });

store.subscribe((mutation) => {
  if (updateProfileOn.indexOf(mutation.type.split('/')[1]) > -1) {
    autosaveProgram();
  }
});

export default store;
