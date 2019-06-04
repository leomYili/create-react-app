# [axis-react-app-rewire-multiple-entry] is update by [React App Rewire Multiple Entry]

## Usage

```bash
npm install axis-react-app-rewire-multiple-entry --save-dev
```

### Basic Usage

```js
// config-overrides.js

const multipleEntry = require('axis-react-app-rewire-multiple-entry')([{
    entry: 'src/entry/admin.js',
    template: 'public/admin.html'
    outPath: '/admin.html'
}]);

module.exports = {
    webpack: function(config, env){
        multipleEntry.addMultiEntry(config);
        return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            return multipleEntry.addEntryProxy(config);
        };
    }
}

```
