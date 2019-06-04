'use strict';

const path = require('path');
const pwd = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appIndexJs = path.resolve(pwd, 'src/index.js');
const appHtml = path.resolve(pwd, 'public/index.html');

const formatName = function(name) {
  return name
    .split('/')
    .reverse()[0]
    .match(/^[^.]*/)[0];
};

module.exports = function(params) {
  // Prepare Data for Multiple Entry
  const isArray = Object.prototype.toString.call(params) === '[object Array]';

  const validElements = params.filter(function(entry) {
    return entry && Object.keys(entry).length;
  });

  const entries =
    isArray &&
    validElements &&
    validElements.map(function(entry) {
      if (!entry.entry) {
        throw new Error(
          'Missing attribute [entry], Received  ' + JSON.stringify(entry)
        );
      }
      if (!entry.template) {
        entry.template = appHtml;
      } else {
        entry.template = path.resolve(pwd, entry.template);
      }
      if (!entry.outPath) {
        entry.outPath = path.relative(pwd, entry.template).replace(/\\/g, '/');
      }
      entry.outPath = entry.outPath.replace(/^\//, '').replace(/\/$/, '');
      return {
        name: formatName(entry.entry),
        entry: path.resolve(pwd, entry.entry),
        template: entry.template,
        outPath: entry.outPath,
        proxyPath: '/build/' + entry.outPath,
        pattern: new RegExp(
          '^' + entry.outPath.replace(/[-/\\^$&*+?.()|[\]{}]/g, '\\$&')
        )
      };
    });

  return {
    addEntryProxy: function(config) {
      if (!entries || !entries.length) {
        return config;
      }
      if (!config.historyApiFallback) {
        config.historyApiFallback = { disableDotRule: true };
      }

      if (!config.historyApiFallback.rewrites) {
        config.historyApiFallback.rewrites = [];
      }

      config.historyApiFallback.rewrites = config.historyApiFallback.rewrites.concat(
        entries.map(function(entry) {
          return {
            from: entry.pattern,
            to: entry.proxyPath
          };
        })
      );

      return config;
    },
    addMultiEntry: function(config) {
      if (!entries || !entries.length) {
        return config;
      }
      // Mulitple Entry JS
      let defaultHTMLPluginIndex = 0;
      const defaultEntryPath = 'src/index.js';
      const defaulEntryName = formatName(defaultEntryPath);
      const defaultEntryHTMLPlugin = config.plugins.filter(function(
        plugin,
        index
      ) {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
          defaultHTMLPluginIndex = index + 1;

          return true;
        }
      })[0];
      defaultEntryHTMLPlugin.options.chunks = [defaulEntryName];
      const necessaryEntry = config.entry.filter(function(file) {
        return file !== appIndexJs;
      });

      const multipleEntry = {};
      multipleEntry[defaulEntryName] = config.entry;

      entries.forEach(_entry => {
        multipleEntry[_entry.name] = necessaryEntry.concat(_entry.entry);
        // Multiple Entry HTML Plugin
        config.plugins.splice(
          defaultHTMLPluginIndex,
          0,
          new HtmlWebpackPlugin(
            Object.assign({}, defaultEntryHTMLPlugin.options, {
              filename: _entry.outPath,
              template: _entry.template,
              chunks: [_entry.name]
            })
          )
        );
        defaultHTMLPluginIndex++;
      });

      config.entry = multipleEntry;

      // Multiple Entry Output File
      let names = config.output.filename.split('/').reverse();

      if (names[0].indexOf('[name]') === -1) {
        names[0] = '[name].' + names[0];
        config.output.filename = names.reverse().join('/');
      }

      return config;
    }
  };
};
