const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );
console.log(dotenv.parsed)
const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    chunks: ["main"],
    filename: "index.html",
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin( {
    "process.env": {}
  } ),
];

if (process.env.NODE_ENV === 'production') {
  plugins.unshift(
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dlls/vendor_manifest_production.json")
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dlls/entities_manifest_production.json")
    })
  );

  plugins.push(
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dlls/*.production.dll.js'),
      includeSourcemap: false
    }),
    new UglifyJsPlugin(),
    new CleanWebpackPlugin(['www/*.*'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
} else {
  plugins.unshift(
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dlls/vendor_manifest_development.json")
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dlls/entities_manifest_development.json")
    })
  );

  plugins.push(
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dlls/*.development.dll.js'),
      includeSourcemap: false
    })
  )
}

module.exports = {
  cache: true,

  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: './src',
    historyApiFallback: true,
  },
  watch: false,

  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],

  output: {
    path: path.resolve(__dirname, "www"),
    chunkFilename: '[name]-[hash].bundle.js',
    filename: process.env.NODE_ENV === 'production' ? '[name]-app-[hash].js' : '[name]-app.js',
    library: "www",
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test : /\.(svg|gif|png)/,
        exclude: /(node_modules)/,
        loader : 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins,
};
