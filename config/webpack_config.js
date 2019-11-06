// 引入 path 模块，处理各个目录之间层级转换。
let path = require("path");
let webpack = require("webpack");
// 引入 html 文件自动注入js插件
let HtmlwebpackPlugin = require('html-webpack-plugin');
let VueloaderPlugin = require("vue-loader/lib/plugin");
// 获取项目目录。
let projectPath = path.resolve(__dirname, "../");
const webpackConfig = {
    mode: "development",
    // 入口文件
    entry: {
        app: path.join(projectPath, "./src/index.js")
    },
    // 结果输出
    output: {
        path: path.join(projectPath, "./dist/"), // 输出目录


        // 输出文件名，可以写入目录层级在里面。这里使用[name]，是为了打包的时候，生成的名称根据打包模块自动适应名字。
        filename: "static/js/[name].js",

        publicPath: "./" // 输出的文件是会自动注入到 index.html 里面的，此处的作用是：在注入时，src 的最前方的一截内容。
    },
    // webpack在编译打包时，要处理那些文件：
    resolve: {
        extensions: [".js", ".vue", ".json"] // 三种基本的必须要加入噻， vue单页面组件， 所以vue后缀文件必不可少了。
    },
    // 配置vue-loader
    module: {
        rules: [
            // 处理vue文件
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },{
                // 处理 js 文件， vue 文件里 script 节点的js内容也会被这里处理
                test: /\.js$/,
                loader: 'babel-loader',
            },{
                // 处理 css 文件， vue 文件里 style 节点的样式内容也会被这里处理
                test: /\.css$/,
                loader: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },{
                // 处理json文件
                test: /\.json$/,
                loader: 'json-loader'
            },{
                // 处理资源文件
                test: /\.(png|jpe?g|gif|svg)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/img/[name]_[hash:7].[ext]'
                }
            }
        ]
    },
    // vueloader插件
    plugins: [
        new VueloaderPlugin(),
        new HtmlwebpackPlugin({ // 将 index.html 也打包到输出中。
            filename: 'index.html',
            template: path.join(projectPath, 'src/index.html'),
            inject: true
        })
    ]
};
module.exports = webpackConfig;
