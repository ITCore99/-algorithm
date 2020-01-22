const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve(__dirname,"../dist"),
        //publicPath:'dist/'      //会在所有的url前面拼接上 由于解决在未打包html之前解决图片路径问题
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
            {
                test: /.less$/,
                use:[
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        }, 
                        {
                            loader: "less-loader"
                        }
                ]
            },
            {
                test: /.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 9000,
                      name:"img/[name].[hash:8].[ext]"
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    resolve: {      //解决一些
        //别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(["./dist"]),
        new HtmlWebpackPlugin({
            title: "创建自己的webpack项目",
            template: "./index.html",
            filename: "index.html",
            favicon: "./src/img/small.jpg",
            hash: true,
            showErrors: true,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new copyWebpackPlugin(
            [
                {
                    from: "./src/public",
                    to: "public"
                }
            ])
    ]
}