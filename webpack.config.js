const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MODE = 'development'; // development or production
const enabledSourceMap = MODE === 'development';
const enableCssMinimize = MODE === 'production';
const publidDir = path.join(__dirname, 'public');

module.exports = {
  watch: true,
  mode: MODE,
  entry: './src/index.js',
  output: {
    path: publidDir,
    filename: 'assets/javascripts/bundle.js',
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      // CSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: enabledSourceMap,
                importLoaders: 2, //  2 => postcss-loader, sass-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: enabledSourceMap,
                plugins: [require('autoprefixer')()],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: enabledSourceMap,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [new ExtractTextPlugin('assets/stylesheets/bundle.css')],
  devServer: {
    contentBase: publidDir,
    port: 8080,
  },
};
