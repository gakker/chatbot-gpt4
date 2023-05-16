// const { fileURLToPath, URL } = require('node:url');
const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        return options
      })
  }
}

