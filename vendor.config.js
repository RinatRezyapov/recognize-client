const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DllPlugin({
        name: "vendor_production_[hash]",
        path: path.resolve(__dirname, "dlls/vendor_manifest_production.json")
    }),
    new CleanWebpackPlugin([ 'dlls/vendor_*.production.dll.js', 'vendor_manifest_production.json' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
} else {
  plugins.push(
    new webpack.DllPlugin({
        name: "vendor_development_[hash]",
        path: path.resolve(__dirname, "dlls/vendor_manifest_development.json")
    }),
    new CleanWebpackPlugin([ 'dlls/vendor_*.development.dll.js', 'vendor_manifest_development.json' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
}

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-cheap-module-source-map',
    entry: [
      "react",
      "react-dom",
    ],
    output: {
        path: path.resolve(__dirname, "dlls"),
        filename: process.env.NODE_ENV === 'production' ? 'vendor_[hash].production.dll.js' : 'vendor_[hash].development.dll.js',
        library: process.env.NODE_ENV === 'production' ? 'vendor_production_[hash]' : 'vendor_development_[hash]'
    },
    plugins
}
