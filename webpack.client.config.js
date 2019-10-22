const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

let isProduction = false;

module.exports = merge(baseConfig, {
  entry: "./app/entry-client.ts",
  plugins: [new VueSSRClientPlugin()],
  output: {
    path: path.resolve("./dist/public/"),
    filename: "[name].[hash:8].js",
    publicPath: "/dist/public/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:8]"
              }
            }
          }
        ]
      }
    ]
  }
  //   output: {
  //     path: path.resolve("./dist/"),
  //     filename: "[name].[hash:8].js",
  //     publicPath: "/dist/"
  //   },
  // optimization: {
  //     runtimeChunk: "single",
  //     splitChunks: {
  //         chunks: "all",
  //         cacheGroups: {
  //             default: { enforce: true, priority: 1 },
  //             vendors: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 2,
  //                 name: "vendors",
  //                 enforce: true,
  //                 chunks: "all"
  //             }
  //         }
  //     }
  // }
});
