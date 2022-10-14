const host = process.env.VUE_APP_CONFIG_HOST
const port = process.env.VUE_APP_CONFIG_PORT ? process.env.VUE_APP_CONFIG_PORT : 8099
const devServer = {
  proxy: {
    '/portal/*': {
      target: process.env.VUE_APP_CONFIG_PROXY_PORTAL_TARGET,
      pathRewrite: { '^/portal': '' }
    },
    '/ws/*': {
      target: process.env.VUE_APP_CONFIG_PROXY_PORTAL_TARGET,
      ws: true,
      pathRewrite: { '^/ws': '' }
    },
  },
  port,
}
if (host) {
  devServer.host = host
}
const publicPath = process.env.VUE_APP_PUBLIC_PATH?process.env.VUE_APP_PUBLIC_PATH:''
module.exports = {
  devServer,
  publicPath,
  productionSourceMap: false,
  outputDir: process.env.VUE_APP_NET == "GONGAN" ? "dist/portal" : "dist/net",
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
}
