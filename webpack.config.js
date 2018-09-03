var path = require('path');

module.exports = {
  mode: 'production',
  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 9000
  },
  output: {
    filename: 'index.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};