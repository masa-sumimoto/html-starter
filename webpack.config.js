// cssをwebpackから分離する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MODE = 'production';
const enabledSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'assets/javascripts/bundle.js',
  },
  module: {
    rules: [
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
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // Bundling CSS
            options: {
              url: false, // disallow url() in CSS
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: enabledSourceMap,
          //   },
          // },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/bundle.css',
    }),
  ],
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 8080,
  },
};
