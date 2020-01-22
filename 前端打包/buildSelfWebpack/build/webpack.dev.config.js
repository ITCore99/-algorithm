const WebpackMerge = require("webpack-merge");
const WebpackBaseConfig = require("./webpack.base.config")
module.exports = WebpackMerge(WebpackBaseConfig,{
    devServer: {
        contentBase: "./dist",
        port: 1024,
        compress: true,
        open: true,
        hot: true
    }
})