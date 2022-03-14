/** @format */

import Vue from 'vue';
import ru from './translations/ru';

let translations = {};
Object.assign(translations, ru);

Vue.prototype.$t = function(s, lang) {
  if (!lang) lang = 'ru'; //this.$root.lang;
  let str = s.toLowerCase();
  if (this.$root.config && this.$root.config.translations && this.$root.config.translations[str]) {
    return this.$root.config.translations[str];
  } else if (translations[lang] && translations[lang][str]) {
    return translations[lang][str];
  } else if (this.$root.getDoctorTranslation) {
    return this.$root.getDoctorTranslation(s);
  } else return s;
};

Vue.prototype.$log = function(info) {
  console.log(info);
};
