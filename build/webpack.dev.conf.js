'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


// 数据模拟
const express = require('express')
const app = express()
const appData = require('../userInfo.json')
let admin = appData.admin
let empolyee = appData.empolyee
let storeList = appData.storeList
let gdsStore = appData.gdsStore
let orderList = appData.orderList
let gds = appData.gds
let gdsPrice = appData.gdsPrice
let product1 = appData.product1
let product2 = appData.product2

let apiRouters = express.Router()
app.use('/api', apiRouters)



const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app){
      app.get('/api/admin', (req, res) => {
        res.json({
          errno: 0,
          data: admin
        })
      }),
      app.get('/api/empolyee', (req, res) => {
        res.json({
          errno: 0,
          data: empolyee
        })
      }),
      app.get('/api/storeList', (req, res) => {
          res.json({
              errno: 0,
              data: storeList
          })
      }),
      app.get('/api/gdsStore', (req, res) => {
          res.json({
              errno: 0,
              data: gdsStore
          })
      }),
      app.get('/api/orderList', (req, res) => {
          res.json({
              errno: 0,
              data: orderList
          })
      }),
      app.get('/api/gds', (req, res) => {
          res.json({
              errno: 0,
              data: gds
          })
      }),
      app.get('/api/gdsPrice', (req, res) => {
          res.json({
              errno: 0,
              data: gdsPrice
          })
      }),
      app.get('/api/product1', (req, res) =>{
          res.json({
              errno: 0,
              data: product1
          });
      }),
      app.get('/api/product2', (req, res) => {
          res.json({
              errno: 0,
              data: product2
          });
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
