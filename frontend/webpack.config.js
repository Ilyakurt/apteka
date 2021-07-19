// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');
// const loader = require('sass-loader');

// module.exports = {
//     mode: "development",
//     entry: {
//         // main: ["@babel/polyfill", path.resolve(__dirname, './src/index.js')],
//         main: ["@babel/polyfill", './src/index.js']
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         clean: true,
//         publicPath: "/",
//         filename: '[name].bundle.js',
//     },
//     resolve: {
//         modules: [path.resolve(__dirname), './node_modules/'],
//         extensions: [".js"]
//     },
//     plugins: [
//         new webpack.ProgressPlugin(),
//         new HtmlWebpackPlugin({
//             title: 'webpack Boilerplate',
//             template: 'public/index.html', // шаблон
//             filename: 'index.html', // название выходного файла
//         }),
//         // new MiniCssExtractPlugin({
//         //     filename: 'static/css/[name].css',
//         // }),
//     ],
//     module: {
//         rules: [
//             // JavaScript
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader'],
//             },
//             {
//                 test: /.(scss|css)$/,
//                 use: [
//                 //   MiniCssExtractPlugin.loader,
//                 "style-loader",
//                   { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
//                 //   { loader: 'postcss-loader', options: { sourceMap: false } },
//                   { loader: 'sass-loader', options: { sourceMap: false } },
//                 ],
//               },
//         ],
//     },
//     devServer: {
//         historyApiFallback: true,
//         compress: false,
//         overlay: false,
//         hot: true,
//         port: 3000,
//         stats: {
//           modules: false,
//         },
//         noInfo: true,
//         watchOptions: {
//           aggregateTimeout: 500,
//           poll: 1000
//         }
//       }
// }

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const isProd = !!process.env.NODE_ENV;

console.log('Production:', isProd);

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    modules: [path.resolve(__dirname), 'node_modules/'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@colors': path.resolve(__dirname, 'src', 'styles', 'colors.modules.scss'),
      '@icons': path.resolve(__dirname, 'public', 'static', 'icons'),
      '@images': path.resolve(__dirname, 'public', 'static', 'images'),
    },
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'static/js/[name].js',
    publicPath: isProd ? './' : '/',
  },
  devServer: {
      open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
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
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Trade-S',
      template: 'public/index.html'
    //   favicon: 'public/static/images/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': JSON.stringify(`${isProd}`)
    }),
  ],
};