module.exports = {
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 9000
  },
  output: {
    filename: 'index.js'
  }
}