// 引入 webpack 打包模块
let webpack = require("webpack");
// 引入 webpack 配置对象
let webpackConfig = require("./webpack_config");
// 引入文件模块
let fs = require("fs");
// 引入路径处理模块
let path = require("path");
// 删除目录方法
let deleteFolder = function (path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
// 打包的目的就是要用于发布，所以，打包时要指定环境为生产环境：
webpackConfig.mode="production";
// 实现将各种功能的文件导出到不同的js里。
webpackConfig.optimization = {
    // 将webpack运行时文件导出到指定文件里。
    runtimeChunk: {
        name: "webpack_runtime"
    },
    // 将其他要分割的模块进行分割定义
    splitChunks: {
        chunks: 'all',
        // 定义打包输出模块名和文件名的间隔符号。由于文件名定义的是[name].js，没有实际的文件名，所以在实际打包结果里，不会出现间隔符，而是只有模块名
        automaticNameDelimiter: "_",
        cacheGroups: {
            // 将第三方依赖打包入一个third文件中
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: "third",
                minChunks: 1
            },
            // 将引用了2次及以上的模块提取为公共commons模块。
            commons: {
                name: "commons",
                minChunks: 2
            }
        }
    }
};
// 打包前，先删除以前打包的内容。
let distDir = path.join(__dirname, "../dist");
if (fs.existsSync(distDir)){
    console.log("删除旧打包数据...");
    deleteFolder(distDir);
}
// 使用打包模块进行打包
console.log("webpack 打包开始...");
webpack(webpackConfig, function (err, stats) {
    if (err || stats.hasErrors()) {
        console.error(err || stats.toString());
        console.log("webpack 打包出错。");
        return;
    }
    console.log(stats.toString());
    console.log("webpack 打包完成。");
});
