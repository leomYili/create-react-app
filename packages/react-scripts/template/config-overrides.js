/* config-overrides.js */
const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index.js',
    template: 'public/index.html',
    outPath: '/index.html',
  },
  {
    entry: 'src/admin.js',
    template: 'public/index.html',
    outPath: '/admin.html',
  },
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  },
  devServer: function(configFunction) {
    multipleEntry.addEntryProxy(configFunction);
    return configFunction;
  },
};
