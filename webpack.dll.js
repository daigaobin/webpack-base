const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'jquery',
      'lodash'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '_dll_[name].js',
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist', 'manifest.json'),
      name: '_dll_[name]'
    })
  ]
}
