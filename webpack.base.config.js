const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件，key:package name，value：文件路径；根目录为 webpack config 文件所在目录
    // babel-polyfill 解决ES6 babel不转换新API;详见 http://babeljs.io/docs/usage/polyfill/
    entry: {
        main: ['babel-polyfill', './src/app.main.js'],
        login: ['babel-polyfill', './src/app.login.js'],
        libs: ['babel-polyfill', './src/libs'],
    },
    // 文件输入目录
    output: {
        path: path.join(__dirname, './public/')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // 从 Vue 组件内提取CSS/SASS;
                    // autoprefix-loader:添加浏览器前缀
                    sass: ExtractTextPlugin.extract({
                        // autoprefix-loader 必须放在 css-loader 前， sass-loder 后，在处理 CSS 前需要先用 autoprefix-loader 处理
                        // webpack 加载 loder 顺序为从后往前
                        use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                        // 当 CSS/SASS 没有从 Vue 组件中提取时调用
                        fallback: 'vue-style-loader'
                    }),

                    css: ExtractTextPlugin.extract({
                        use: ['css-loader', 'autoprefixer-loader'],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        },
        {
            test: /iview\/.*?js$/,
            loader: 'babel-loader'
        },
        {
            test: /\.js$/,
            // babel 配置见 .babelrc 文件
            loader: 'babel-loader',
            // 排除 node_modules 下的 JS 文件
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            // 同上
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'autoprefixer-loader'],
                fallback: 'style-loader'
            })
        },

        {
            test: /\.(sass|scss)$/,
            // 同上
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        },

        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            // 将图片转换为 base64 
            loader: 'url-loader?limit=1000000'
        },
        {
            test: /\.(html|tpl)$/,
            // 处理 HTML 文件
            loader: 'html-loader'
        }
        ]
    },
    resolve: {
        // 自动补全文件后缀名
        extensions: ['.js', '.vue'],
        // 配置文件/目录别名
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            components: path.join(__dirname, './src/components')
        }
    }
};