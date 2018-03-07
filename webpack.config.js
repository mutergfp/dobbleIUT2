var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WP_CONFIG = process.env.WP_CONFIG;

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

const clientConfig = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/client/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/client/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new BrowserSyncPlugin({
      host: process.env.CLIENT_IP || 'localhost',
      port: process.env.CLIENT_PORT || 3000,
      server: {
        baseDir: ['./', './build']
      },
      open: false
    })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: ['babel-loader'], 
        include: path.join(__dirname, 'src/client'),
        exclude: /(node_modules)/
      },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      '@client': path.join(__dirname, 'src/client/')
    }
  }
}

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  watchOptions: {
    ignored: /node_modules/
  },
  //devtool: "cheap-module-source-map",
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: ['babel-loader'], 
        include: path.join(__dirname, 'src/server'),
        exclude: /(node_modules)/
      },
    ]
  },
  resolve: {
    alias: {
      '@server': path.join(__dirname, 'src/server/')
    }
  }
};

let configuration;
if (WP_CONFIG === 'client') configuration = clientConfig;
else if (WP_CONFIG === 'server') configuration = serverConfig;
else configuration = [clientConfig, serverConfig];

module.exports = configuration;