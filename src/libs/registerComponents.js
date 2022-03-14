/** @format */

import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

function registerComponents(requireComponent) {
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));

    Vue.component(`${componentName}`, componentConfig.default || componentConfig);
  });
}

// registerComponents(require.context(
//   '@/share/components', true, /\.vue$/,
// ))

registerComponents(require.context('@/components/templates', true, /\.vue$/));
