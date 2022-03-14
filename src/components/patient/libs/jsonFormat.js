/** @format */
import _ from 'lodash';
export default {
  methods: {
    cleanJSON2(jsonInput) {
      let newObj = _.omitBy(
        jsonInput,
        (value, key) => _.isNull(value) || (_.isString(value) && _.isEmpty(value)) || (_.isArray(value) && _.isEmpty(value))
      );
      console.log('Final', newObj); //Final { a: 1, b: 2, d: 'aa' }
    },
    cleanJSON(jsonInput) {
      console.log('jsonInput', jsonInput);
      const isEmpty = (val) => {
        if (val === null) {
          return true;
        }
        if (typeof val === 'string') {
          return val.trim().length === 0;
        }
        if (val instanceof Array) {
          if (val.length === 0) return true;
          return val.every((v) => isEmpty(v));
        }
        if (val === Object(val)) {
          if (Object.keys(val).length == 0) return true;
          return Object.values(val).every((v) => isEmpty(v));
        }
        return val.length === 0;
      };
      Object.keys(jsonInput).forEach((key) => {
        if (typeof jsonInput[key] === 'object' && !isEmpty(jsonInput[key])) {
          this.cleanJSON(jsonInput[key]);
        } else {
          isEmpty(jsonInput[key]) && delete jsonInput[key];
        }
      });
    },
  },
};
