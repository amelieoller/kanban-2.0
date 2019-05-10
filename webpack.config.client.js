const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZopfliPlugin = require('zopfli-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const dotenv = require('dotenv');
const TerserPlugin = require('terser-webpack-plugin');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  name: 'client',
  target: 'web',
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/static/',
    filename: 'bundle.[hash:6].js'
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|gif|mp3|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: '[name].[hash:6].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            noquotes: true,
            limit: 4096,
            name: '[name].[hash:6].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanPlugin(['dist']),
    new CopyPlugin([{ from: 'src/assets/favicons', to: 'favicons' }]),
    new ManifestPlugin(),
    new MiniCssExtractPlugin(),
    new ZopfliPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
