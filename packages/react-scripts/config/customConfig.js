'use strict';

const defaultConfig = {
  BUNDLE_ANALYZER: false,
  COMPRESSION: true,
  IMPORT_LODASH: true,
  DROP_CONSOLE: true,
  DLL_VENDOR: ['react', 'react-dom'],
  OUT_PUT_FILE_HASH_TYPE: '[name].[contenthash:8]',
};

function getCustomConfig(str) {
  var _str = str.toUpperCase();

  switch (_str) {
    case !process.env['REACT_APP_' + _str]:
      return defaultConfig[_str];
    case 'DLL_VENDOR':
      return process.env['REACT_APP_' + _str].split(',');
    case 'OUT_PUT_FILE_HASH_TYPE':
      if (process.env['REACT_APP_' + _str] == '') {
        return defaultConfig[_str];
      } else {
        return process.env['REACT_APP_' + _str];
      }
    default:
      return JSON.parse(process.env['REACT_APP_' + _str]);
  }
}

module.exports = getCustomConfig;
