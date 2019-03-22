# 安装webpack
```
yarn add webpack webpack-cli -D
```

# 运行webpack
```
+ npx webpack
+ npx webpack --config webpack.config.main.js
```

# 配置webpack
```
webpack.config.js
```

# 配置package.json快捷方式
```
  "scripts": {
    "build": "webpack --config webpack.config.my.js",
    "builds": "webpack"
  },
```
+ 第一种方式直接yarn build可以执行
+ 第二种方式可以通过传参指定配置文件地址 yarn build -- --config webpack.config.my.js 中间的 -- 代表传参

# 安装webpack http服务(express)
```
yarn add webpack-dev-server -D
```

# Html插件
```
yarn add html-webpack-plugin -D
```

# css插件
```
yarn add style-loader css-loader -D
```

# 抽离css插件
```
yarn add mini-css-extract-plugin -D
```

# 自动增加浏览器前缀插件(webkit)
```
yarn add postcss-loader autoprefixer -D
```

# 压缩js、css插件
```
yarn add uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin -D
```

# 文件插件
```
yarn add file-loader url-loader html-withimg-loader -D
```
+ url-loader支持base64
+ html-withimg-loader提取img标签src中的路径

# babel
```
yarn add babel-loader @babel/core @babel/preset-env -D  

转换class语法
yarn add @babel/plugin-proposal-class-properties -D 

合并打包后生成的函数
yarn add @babel/runtime 
yarn add @babel/plugin-transform-runtime  -D

转换es6其他语法,不可以放到devDependencies下面,允许的时候需要它先执行
yarn add @babel/polyfill
```

# Eslint
```
yarn add eslint eslint-loader babel-eslint eslint-plugin-vue -D
```