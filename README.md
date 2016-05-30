# ko-hot-loader

[![NPM](https://img.shields.io/npm/v/ko-hot-loader.svg)](https://www.npmjs.com/package/ko-hot-loader)
![WTFPL](https://img.shields.io/npm/l/ko-hot-loader.svg)
[![Travis](https://img.shields.io/travis/Profiscience/ko-hot-loader.svg)](https://travis-ci.org/Profiscience/ko-hot-loader)
[![Dependency Status](https://img.shields.io/david/Profiscience/ko-hot-loader.svg)](https://david-dm.org/Profiscience/ko-hot-loader)
[![Peer Dependency Status](https://img.shields.io/david/peer/Profiscience/ko-hot-loader.svg?maxAge=2592000)](https://david-dm.org/Profiscience/ko-hot-loader#info=peerDependencies&view=table)

_Webpack Hot-Module Replacement Preprocessor and Runtime for KnockoutJS_

### Assumptions
- You are using [webpack](https://webpack.github.io/docs/tutorials/getting-started/) (and the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html))
- You are using [babel (>=6)](https://github.com/babel/babel-loader)

## Usage

1. Add `ko-hot-loader/babel` to your babel config (e.g. `.babelrc`)
**.babelrc**
```json
{
  "plugins": ["ko-hot-loader/babel"]
}
```

2a. Add HMR Entries and Plugin to your Webpack config and `hot: true, publicPath: 'http://localhost:8080/'` to your dev server config
**webpack.config.js**
```javascript
entry: [
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8080/',
  './app.js'
],
plugins: [
  new webpack.HotModuleReplacementPlugin()
]
```
```javascript
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = { entry: ... }
const compiler = webpack(config)

const server = new DevServer(compiler, {
  hot: true,
  publicPath: 'http://localhost:8080/'
})
```

**or**

2b. Invoke the dev server cli with `--hot`
```bash
webpack-dev-server --hot --inline --config webpack.config.js
```

3. Profit :moneybag:
