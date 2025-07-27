const _ = require('lodash');
const path = require('path');

module.exports = {
  paths: function (paths) {
    paths.appIndexJs = path.resolve(__dirname, './index.tsx');
    paths.appSrc = path.resolve(__dirname, './');
    return paths;
  },

  webpack: (config) => {
    const overrides = {
      module: {
        rules: [],
      },
    };

    return _.merge(config, overrides);
  },
};
