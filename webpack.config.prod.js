const { resolve } = require('path');

module.exports = {
  entry: './src/components/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  externals: {
    react: {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'}
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: 'ReactTagsEditor',
    libraryTarget: 'umd'
  },
};