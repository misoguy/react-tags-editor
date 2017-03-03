var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    react: {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'}
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'reactTagsEditor.js',
    library: 'ReactTagsEditor',
    libraryTarget: 'umd'
  },
};