const path = require('path');
// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// options
const MODE = 'development'; // production or development
const enabledSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/javascripts/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   // CSS内の画像やファイルなどの外部リソースのカスタムパブリックパス
            //   publicPath: "/public/assets/",
            // },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: enabledSourceMap,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: enabledSourceMap,
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/bundle.css',
      // chunkFilename: "bundle-chunk.css",
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html',
    }),
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 8080,
  },
};
