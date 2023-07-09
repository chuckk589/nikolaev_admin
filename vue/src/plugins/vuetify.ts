// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
  defaults: {
    VTextField: {
      density: 'compact',
    },
    VSelect: {
      density: 'compact',
    },
    VTextarea: {
      density: 'compact',
    },
    VCheckbox: {
      density: 'compact',
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
