// 引入 express 依赖
let express = require("express");
// 引入webpack
let webpack = require("webpack");
// 引入写好的webpack配置
let webpackconfig = require("./webpack_config");
// 引入 webpack 与 express 的中间件
let devMiddleware = require('webpack-dev-middleware');
// 引入路径处理工具
let path = require("path");
// 定义端口
let PORT = 3011;
// 创建一个服务器。
let app = express();
// 使用 webpack的配置，建立一个webpack 编译器，使单文件vue能够被webpack编译。
let compiler = webpack(webpackconfig);
// 使用编译器创建一个express中间件
let middleware = devMiddleware(compiler, {
    publicPath: "/",
    index: 'index.html'
});
// 将中间件纳入express创建的服务程序。
app.use(middleware);
// 防止google浏览器因为找不到这个文件而显示一个不好看的错误。
app.use("/favicon.ico", function (req, res) {
    res.end("");
});
// 启动服务，监听端口。
app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("服务已开启，点击：http://127.0.0.1:" + PORT + " 打开.");
    }
});
