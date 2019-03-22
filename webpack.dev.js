const merge = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'development', // development、production
  devtool: 'cheap-module-eval-source-map'
  // watch: true // dev、build模式会监听文件改动，然后打包
})
