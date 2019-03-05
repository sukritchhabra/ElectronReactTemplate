/* global require, module, __dirname */

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copy assets to /docs

const webpack = require('webpack');

const { NODE_ENV } = process.env;
const IS_PROD = NODE_ENV === 'production';
const IS_DEV = NODE_ENV === 'development';

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.jsx'
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              webp: {
                quality: 60,
                lossless: true,
              }
            },
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      state: path.resolve(__dirname, 'src/state'),
      styles: path.resolve(__dirname, 'src/components/styles'),
      images: path.resolve(__dirname, 'src/assets/images'),
    },
    extensions: ['.js', '.jsx']
  },

  devServer: {
    contentBase: './docs',
    historyApiFallback: true,
    hot: true,
    overlay: true,
  },

  plugins: [
    new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin([{ from: './src/assets/images', to: 'assets/images' }]),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      inject: false,
      chunks: ['app'],
      template: require('html-webpack-template'), // eslint-disable-line
      appMountId: 'content'
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      APP_CONFIG: {
        ENV: JSON.stringify(process.env.NODE_ENV),
        PROD: JSON.stringify('production'),
        DEV: JSON.stringify('development'),
        IS_PROD: JSON.stringify(IS_PROD),
        IS_DEV: JSON.stringify(IS_DEV),
      }
    }),
    new Dotenv({
      path: './.env',
    }),
  ]
};
