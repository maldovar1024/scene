import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';

export const publicPath = path.resolve(__dirname, 'public');
export const srcPath = path.resolve(__dirname, 'src');
export const distPath = path.resolve(__dirname, 'dist');

const webpackConfig: webpack.Configuration = {
  entry: path.resolve(srcPath, 'index.ts'),
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.vert$|\.frag$/,
        use: 'raw-loader',
      },
      {
        test: /\.jpg$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new ESLintPlugin({
      context: srcPath,
      extensions: 'ts',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      favicon: path.resolve(publicPath, 'favicon.ico'),
    }),
    new MiniCssExtractPlugin(),
  ],
  stats: {
    assetsSort: '!size',
    builtAt: false,
    children: false,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  },
};

export default webpackConfig;
