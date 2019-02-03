const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.unshift(
      new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "dlls/vendor_manifest_production.json")
      })
  );
  plugins.push(
    new webpack.DllPlugin({
      name: "entities_production_[hash]",
      path: path.resolve(__dirname, "dlls/entities_manifest_production.json")
    }),
    new UglifyJsPlugin(),
    new CleanWebpackPlugin([ 'dlls/entities_*.production.dll.js', 'entities_manifest_production.json' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
} else {
  plugins.unshift(
    new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dlls/vendor_manifest_development.json")
    })
  );
  plugins.push(
    new webpack.DllPlugin({
      name: "entities_development_[hash]",
      path: path.resolve(__dirname, "dlls/entities_manifest_development.json")
    }),
    new CleanWebpackPlugin([ 'dlls/entities_*.development.dll.js', 'entities_manifest_development.json' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
}

module.exports = {

  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'cheap-module-eval-source-map',

  entry: ["./src/api/entities.ts"],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, "dlls"),
    filename: process.env.NODE_ENV === 'production' ? 'entities_[hash].production.dll.js' : 'entities_[hash].development.dll.js',
    library: process.env.NODE_ENV === 'production' ? 'entities_production_[hash]' : 'entities_development_[hash]'
  },
  plugins
}