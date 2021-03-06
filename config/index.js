// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: {
        NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    witnesses: [
      "wss://node1.gxb.io",
      "wss://node5.gxb.io",
      "wss://node8.gxb.io",
      "wss://node11.gxb.io"
    ],
    faucet_url: "http://opengateway.gxb.io",
    referrer: "opengateway",
    visualizationConfig: {
        "common": {
            "port": 3000,
            "ipfs_addr": "/ip4/139.196.138.193/tcp/5001",
            "witnesses": [
                "wss://node1.gxb.io",
                "wss://node5.gxb.io",
                "wss://node8.gxb.io",
                "wss://node11.gxb.io"
            ],
            "faucet_url": "http://opengateway.gxb.io",
        }
    },
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
        NODE_ENV: '"development"'
    },
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    witnesses: [
      "ws://192.168.1.118:28090"
    ],
    faucet_url: "http://192.168.1.118:1337/gateway",
    referrer: "nathan",
    visualizationConfig: {
        "common": {
            "port": 3000,
            "ipfs_addr": "/ip4/139.196.138.193/tcp/5001",
            "witnesses": [
                "ws://192.168.1.118:28090"
            ],
            "faucet_url": "http://192.168.1.118:1337/gateway",
            "referrer": "nathan"
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
