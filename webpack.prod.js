const merge = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'production', // development、production
  devtool: 'cheap-module-source-map'
})
