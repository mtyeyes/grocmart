const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = ext => {
  isDev ? `[name].${ext}` : `[name].[hash].${ext}` ;
}
const optimization = () => {
  if(isDev) {return};
  return {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
    ]
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
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    port: 80,
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
    })
  ],
  optimization: optimization(),
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
        test: /\.(woff|woff2)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(png|jpg|svg|webp)$/,
        type: 'asset/resource'
      }
    ]
  }
}