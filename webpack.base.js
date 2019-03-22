const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清除dist文件夹
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  mode: 'development', // development、production

  devtool: 'cheap-module-eval-source-map', // development：cheap-module-eval-source-map production：cheap-module-source-map

  watchOptions: {
    aggregateTimeout: 600, // 防抖 600毫秒后执行
    poll: 1000, // 每秒检查一次变动
    ignored: /node_modules/
  },

  entry: './src/index.js', // 入口起点(entry point)

  output: { // 出口
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist' // 必须加publicPath // 全局公共的路径 比如http://www.youzu.com
  },
  /**
   * 服务器配置
   */
  devServer: {
    open: true,
    port: 3000,
    progress: true,
    contentBase: './dist',
    hot: true, // 热更新
    /* proxy: { //代理
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': ''
        }
      }
    }  */
    before(app) { // node app实例 ajax请求执行之前的钩子函数
      app.get('/user', (req, res) => {
        res.json({ name: '测试' })
      })
    }
  },
  /**
   * 解析
   */
  resolve: {
    modules: ['node_modules'], // 告诉 webpack 解析模块时应该搜索的目录
    extensions: ['.js', '.vue', '.json'] // 扩展名 类似查找xxx.js xxx.vue xxx.json
    /* mainFields: ['style', 'main'] //告诉 webpack 首先寻找哪个目录
    alias: { //别名 使用@路径时自动转成src目录下的文件
            'vue$' : 'vue/dist/vue.esm.js',
            '@'    : resolve('src')
        }*/
  },
  /**
   * 模块
   */
  module: {
    noParse: /jquery|lodash/, // 加快打包速度 打包时不去解析jquery是否引用其他文件
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 2 * 1024, // 小于200kb使用base64
            outputPath: 'img', // 打包后的路径
            publicPath: '' // 图片公共的路径 比如http://www.youzu.com
          }
        }
      ]
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-withimg-loader'
        }
      ]
    }, /*  {
      enforce: "pre",
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "eslint-loader"
    }, */ {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-proposal-class-properties', // 转换class插件
              { 'loose': true } // true 不会使用Object.defineProperty去生成代码
            ]
          ]
        }
      }
    }]
  },
  /**
   * 插件
   */
  plugins: [ // 插件配置
    /**
     *  如果这个值是一个字符串，它会被当作一个代码片段来使用。
     *  如果这个值不是字符串，它会被转化为字符串(包括函数)。
     *  如果这个值是一个对象，它所有的 key 会被同样的方式定义。
     *  如果在一个 key 前面加了 typeof,它会被定义为 typeof 调用。
     */
    new webpack.DefinePlugin({ // 定义全局环境变量
      NODE_ENV: JSON.stringify(true)
    }),
    // new CleanWebpackPlugin(), // 清空dist目录
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
      hash: true, // hash code
      title: 'Hello World',
      minify: {
        removeAttributeQuotes: true // 去掉双引号
        // collapseWhitespace: true //html压缩成一行
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    /* new webpack.ProvidePlugin({ // 在每个模块中自动注入$
      $: 'jquery'
    }), */
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new webpack.IgnorePlugin(/moment\/locale\//), // 打包时忽略相应的文件
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    })
    /* new AutoDllPlugin({
      filename: '[name].dll.js',
      entry: {
        vendor: [
          'jquery',
          'lodash'
        ]
      }
    }) */
  ],
  /**
   * 优化项
   */
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: { // 抽离公共代码，老版本叫commonChunkPlugins
      // chunks: 'all',
      cacheGroups: { // 缓存组
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    }
  }
}
