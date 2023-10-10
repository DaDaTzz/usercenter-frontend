const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // 设置端口号
    host: 'localhost', // 设置主机名
  }
})
