import { merge } from 'webpack-merge';
import common, { distPath } from './webpack.common';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: distPath,
    hot: true,
  },
  output: {
    publicPath: '/',
  },
  stats: {
    assets: false,
  },
});
