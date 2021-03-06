import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#ebd2ae',
        secondary: '#720d2c',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        sec: '#969696',
        totext: '#3a0414'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
});
