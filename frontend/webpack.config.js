const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    modules: [path.resolve(__dirname), 'node_modules/'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'static/js/[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            }
          },
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          {
            loader: 'resolve-url-loader',
          },
          { loader: 'sass-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      title: 'Trade-S',
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
  ],
};