const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const publicPath = isDev ? '/' : '/grocmart/';

const filename = ext => {
  isDev ? `[name].${ext}` : `[name].[hash].${ext}` ;
}

const optimization = () => {
  if (isDev) {return};
  return {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
    ]
  };
};

const liveReloadBugfix = () => {
  if (isDev) {
    return 'web';
  } else {
    return 'browserslist';
  };
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.tsx'],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: filename('js'),
    publicPath: publicPath,
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    port: 80,
    hot: true,
    disableHostCheck: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: '../public/index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ 
        from: path.resolve(__dirname, 'public/'),
        to: path.resolve(__dirname, 'dist'),
        globOptions: {
          ignore: ['**/index.html']
        }
      }]
    }),
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(publicPath)
    })
  ],
  optimization: optimization(),
  target: liveReloadBugfix(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(woff2)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|svg|webp)$/,
        type: 'asset/resource'
      }
    ]
  }
}