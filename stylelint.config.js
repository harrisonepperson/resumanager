/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
  },
};

export default config;
