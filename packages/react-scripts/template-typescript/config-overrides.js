/* config-overrides.js */
const path = require('path');
const multipleEntry = require('axis-react-app-rewire-multiple-entry')([
  {
    entry: 'src/admin.js',
    template: 'public/index.html',
    outPath: '/admin.html',
  },
]);

module.exports = {
  webpack: function(config, env) {
    config = multipleEntry.addMultiEntry(config);

    // ant icons import (https://github.com/ant-design/ant-design/issues/12011)
    config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(
      __dirname,
      './src/assets/antIcons.js'
    );

    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      return multipleEntry.addEntryProxy(config);
    };
  },
};
