const merge = require("webpack-merge");
const nodeExternal = require("webpack-node-externals");
const baseConfig = require("./webpack.base.config");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(baseConfig, {
  entry: "./app/entry-server.ts",
  target: "node",
  devtool: "source-map",
  output: {
    libraryTarget: "commonjs2"
  },
  externals: nodeExternal({
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRServerPlugin()]
});
