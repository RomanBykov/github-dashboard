const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    port: 3000
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Main',
    //   template: './src/index.html',
    //   filename: './public/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Details',
    //   template: './src/details.html',
    //   filename: './public/details.html',
    // })
  ]
};
