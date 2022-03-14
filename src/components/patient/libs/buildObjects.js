/** @format */

import dateFilter from '@/filters/date.filter';
import upperFirst from 'lodash/upperFirst';
import models from './models';
export default {
  mixins: [models], 
  data() {
    return {};
  },
  computed: {
    anamnesis() {
      let res = this.fillModelFields('anamnesis');
      return res;
    },
    surveys() {
      let res = this.fillModelFields('surveys');
      return res;
    },
    diagnosis() {
      let res = this.fillModelFields('diagnosis');
      return res;
    },
    info() {
      let res = this.fillModelFields('info');
      return res;
    },

    appointments() {
      let res = this.fillModelFields('appointments');
      return res;
    },
    recomendations() {
      let res = this.fillModelFields('recomendations');
      return res;
    },
    formAnamnesis() {
      let res = this.createFormAnamnesis();
      return res;
    },

    titleArray() {
      let res = [];
      const genTitleArray = (obj) => {
        if (obj.hasOwnProperty('name') && obj.hasOwnProperty('title')) {
          res.unshift({ title: obj.title, name: obj.name });
        }
        Object.keys(obj).forEach(function(k) {
          if (typeof obj[k] === 'object' && obj[k] !== null) {
            genTitleArray(obj[k]);
          }
        });
      };
      genTitleArray([this.anamnesis, this.diagnosis, this.surveys]);
      return res;
    },
  },
  created() {
    //this.$log('created from buildObjects');
  },
  methods: {
    getTitle(title) {
      return (
        this.titleArray.find((el) => {
          return el.name === title;
        })?.title || title
      );
    },
    createFormAnamnesis() {
      let res = this.buildAnamnesisForm();
      return { ['anamnesis']: res };
    },
    fillModelFields(m) {
      let res = this['model' + upperFirst(m)];
      for (let [i, el] of res.entries()) {
        if (el.fields) {
          let arr = el.fields;
          let def = [
            {
              name: el.name,
              //name: el.title,
              parent: el.name,
              title: this.$t(el.title),
              //title: el.title,
              validator: [],
              type: 'text',
            },
          ];
          if (arr.length !== 0) {
            arr.forEach((a) => {
              a.title = this.$t(a.title);
            });
            if (arr.find((a) => a.name === el.name)) {
              def = arr;
            } else {
              def = def.concat(arr);
            }
          }
          res[i].fields = def;
        }
      }
      //console.log('fillModelFields', m, res);
      return res;
    },
    createObjectFormFromModel(model, val = null, data = null) {
      let d2 = {};
      //console.log('data for fill model', data);
      let v;

      for (let el of model) {
        if (el.hasOwnProperty('fields')) {
          d2 = Object.assign({}, d2, {
            [el.name]: this.createObjectFormFromModel(el.fields, null, data),
          });
        } else {
          if (!d2[el.name]) {
            let jsonData;
            if (data) {
              jsonData = JSON.parse(data);
            }
            v = jsonData?.[el.name.toLowerCase()] ? jsonData[el.name.toLowerCase()] : null;
            //if (jsonData) console.log('fill', el.name, jsonData?.[el.name.toLowerCase()]);
            if (el.name.toLowerCase().substring(el.name.toLowerCase().length - 5) === '_file' && typeof v === 'boolean') {
              if (this?.record?.attachedFiles) {
                console.log('files', this?.record?.attachedFiles);
                v = JSON.parse(this.record.attachedFiles)[el.name.toLowerCase()];
              } else {
                v = null;
              }
            }
            d2 = Object.assign({}, d2, { [el.name]: v });
          }
        }
      }
      return d2;
    },
    buildAnamnesisForm() {
      //    let anamnesis = this.fillModelFields('anamnesis');
      if (this.loading) return false;
      if (!this.records && !this.patient) {
        return false;
      }
      let anamnesis = this.anamnesis;
      let objA = {};
      objA = JSON.parse(JSON.stringify(this.createObjectFormFromModel(anamnesis, [])));
      //      if (!this.selectedPatientClinicalRecords && !this.selectedPatient) {
      //console.log('buildAnamnesisForm objA', objA, anamnesis);

      /**  создать связи name=>title основываясь на настройках модели*/
      let src;
      let keys = Object.create(null);
      function getMap(o, path = '') {
        Object.keys(o).forEach(function(k) {
          if (typeof o[k] === 'object' && !Array.isArray(o[k]) && o[k] !== null) {
            return getMap(o[k], path ? `${path}.["${k}"]` : `["${k}"]`);
          }
          let lowerKey = k.toLowerCase();
          keys[lowerKey] = path ? `${path}.["${k}"]` : `["${k}"]`;
        });
      }
      getMap(objA);

      //console.log(objA);
      function addInForm(src) {
        Object.keys(src).forEach(function(k) {
          if (keys[k]) {
            let v = _.get(objA, keys[k]);
            //console.log(0, v, k, src[k]);
            if (!Array.isArray(v)) {
              v = Array.isArray(src[k]) ? src[k] : [src[k]];
              //console.log('not Array', v);
            } else {
              v.unshift(src[k]);
              //console.log('Array', v);
            }
            _.set(objA, keys[k], v);
            //console.log(1, k, keys[k], v, objA);
          } else {
            if (!objA.other) {
              objA.other = {};
            }
            objA.other[k] = src[k];
          }
        });
      }
      function getAllval(o) {
        Object.keys(o).forEach(function(k) {
          if (typeof o[k] === 'object' && !Array.isArray(o[k])) {
            //console.log(k, typeof o[k]);
            return getAllval(o[k]);
          }
          src = { [k]: o[k] };
          if (o[k].length) {
            //console.log('try to write', k, src);
            if (10) addInForm(src);
          }
        });
      }
      let records = this.records;
      let patient = this.patient;
      let recordData = {};
      function getAllval2(o) {
        Object.keys(o).forEach(function(k) {
          if (typeof o[k] === 'object' && !Array.isArray(o[k])) {
            return getAllval2(o[k]);
          }
          src = {
            [k]: {
              id: recordData.id,
              body: o[k],
              doctor_id: recordData.doctor_id,
              created: dateFilter(recordData.createdon),
            },
          };
          if (o[k].length) {
            if (10) addInForm(src);
          }
        });
      }
      //patient?.anamnesis && getAllval(JSON.parse(patient.anamnesis));

      records &&
        records.forEach(function(record) {
          if (record.anamnesis) {
            recordData = JSON.parse(JSON.stringify(record));
            getAllval2(JSON.parse(record.anamnesis));
          }
        });
      //  console.log(objA);
      // this.loading = false;
      return objA;
    },
    fillFormData(src, dst) {
      Object.keys(src).forEach(function(key) {
        if (typeof src[key] === 'object') dst[newkey] = dst[key];
        delete dst[key];
      });
    },
  },
};
