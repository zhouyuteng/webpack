const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const colors = require('colors')

// 同 dev.config
fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
});

const delFiles = dir => {
    // existsSync 检测文件是否存在 存在返回 true
    if (!fs.existsSync(dir)) {
        return
    }
    // readdirSync 读取指定目录下的文件，返回一个包含文件名的数组
    let files = fs.readdirSync(dir)
    files.forEach(file => {
        let filePath = `${dir}/${file}`;
        // statSync(file).isDirectory() 返回该文件是否是文件夹
        if (fs.statSync(filePath).isDirectory()) {
            delFiles(filePath)
        } else {
            // 删除指定文件
            fs.unlinkSync(filePath)
        }
    })
    // 删除指定文件夹
    fs.rmdirSync(dir)
    // console.log(`string`.color) node color 用于在控制台输入带 color 的 log
    console.log(`delete ${dir}/ success`.green);

}

try {
    // 删除指定目录的文件
    delFiles('./public');
    delFiles('./html');
} catch (error) {
    console.log(error);
    console.log(`delete error`);
    // 退出 node 程序
    process.exit()
}

module.exports = merge(webpackBaseConfig, {
    // [hash]：自动生成 hash 值
    output: {
        publicPath: '/public/',
        filename: 'js/[name].min.[hash].js',
        chunkFilename: 'js/[name].min.[hash].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].min.[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
            filename: 'js/libs.min.[hash].js'
        }),
        // 配置生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../html/index.html',
            template: './src/template/index.ejs',
            chunks: ['main', 'libs'],
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: '../html/login.html',
            template: './src/template/index.ejs',
            chunks: ['login', 'libs'],
            inject: false
        }),
        // 压缩选项
        new webpack.optimize.UglifyJsPlugin({
            // 格式化
            beautify: false,
            // 注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除 `console` 
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
    ]
});
