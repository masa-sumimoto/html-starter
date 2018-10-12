const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MODE = 'development';// development or production
const enabledSourceMap = (MODE === 'development');
const enableCssMinimize = (MODE === 'production');
const publidDir = path.join(__dirname, 'public');

module.exports = {
  watch: true,
  mode: MODE,
  entry: './src/index.js',
  output: {
    path: publidDir,
    filename: 'js/bundle.js',
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
                minimize: enableCssMinimize,
                sourceMap: enabledSourceMap,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: enabledSourceMap,
                plugins: [
                  require('autoprefixer')({
                    browsers: ['last 2 versions'],
                  }),
                ],
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
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
  ],
  devServer: {
    contentBase: publidDir,
    port: 8080,
  },
};
