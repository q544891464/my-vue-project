const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'im_notice'

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://121.229.202.55:5080', // 目标服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将 /api 路径前缀替换为空
        }
      }
    }
  },
  // devServer: {
  //   disableHostCheck: true,
  //   port: 8083,
  //   proxy: {
  //     [process.env.VUE_APP_BASE_PROXY_API]: {
  //       target: process.env.VUE_APP_BASE_API,
  //       ws: true,
  //       changeOrigin: true,
  //       secure: false,
  //       pathRewrite: {
  //         ['^' + process.env.VUE_APP_BASE_PROXY_API]: ''
  //       }
  //     }
  //   }
  // },
  configureWebpack: (config) => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.

    // if (process.env.NODE_ENV === 'production') {
    //   // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    // }
    config.name = name
    config.resolve.alias['@'] = resolve('src')
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'zdxlz'
        return args
      })
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true
      })
  },
  // 基本路径
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/im_h5',
  // // 打包构建的文件目录
  outputDir: 'im_h5',
  // // 指定生成index.html的输出路径
  // indexPath:'index.html',
  // // 存放静态资源的目录
  // assetsDir:'asserts'
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'sass',
  //     patterns: [
  //       path.resolve(__dirname, './src/styles/var.scss') // 你的.scss文件所在目录
  //     ]
  //   }
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/class.scss";
          @import "@/styles/var.scss";
          @import "@/styles/mixin.scss";
        `
      },
      less: {
        lessOptions: {
          modifyVars: {
            // Set primary color and other variables
            'primary-color': '#316EF4',
          },
          javascriptEnabled: true
        }
      }
    }
  },
  productionSourceMap: false
}
