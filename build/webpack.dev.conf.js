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
let storeDynamic = appData.storeDynamic
let orderList = appData.orderList
let gds = appData.gds
let gdsPrice = appData.gdsPrice
let product1 = appData.product1
let product2 = appData.product2
let mainType = appData.mainType
let gdsStore = appData.gdsStore
let checkDetail = appData.checkDetail
let intoStore = appData.intoStore
let intocondition = appData.intocondition
let outStore = appData.outStore
let outcondition = appData.outcondition
let orders = appData.orderlist
let selectedByCode = appData.selectedByCode
let customerList = appData.customerList
let customerListDetail = appData.customerListDetail
let unrefund = appData.unrefund
let history = appData.history
let refundDetail = appData.refundDetail
let attachment = appData.attachment
let refund = appData.refund
let status = appData.status
let processedHistory = appData.processedHistory
let processedRefundDetail = appData.processedRefundDetail
let monitor = appData.monitor
let storeType = appData.storeType
let storeInfo = appData.storeInfo
let role = appData.role

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
      app.get('/api/storeDynamic', (req, res) => {
          res.json({
              errno: 0,
              data: storeDynamic
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
      }),
      app.get('/api/mainType', (req, res) => {
          res.json({
              errno: 0,
              data: mainType
          })
      }),
      app.get('/api/gdsStore', (req, res) => {
          res.json({
              errno: 0,
              data: gdsStore
          })
      }),
      app.get('/api/checkDetail', (req, res) => {
          res.json({
              errno: 0,
              data: checkDetail
          })
      }),
      app.get('/api/intoStore', (req, res) => {
          res.json({
              errno: 0,
              data: intoStore
          })
      }),
      app.get('/api/condition', (req, res) => {
          res.json({
              errno: 0,
              data: intocondition
          })
      }),
      app.get('/api/outStore', (req, res) => {
          res.json({
              errno: 0,
              data: outStore
          })
      }),
      app.get('/api/outcondition', (req, res) => {
          res.json({
              errno: 0,
              data: outcondition
          })
      }),
      app.get('/api/orders', (req, res) => {
          res.json({
              errno: 0,
              data: orders
          })
      }),
      app.get('/api/selectedByCode', (req, res) => {
          res.json({
              errno: 0,
              data: selectedByCode
          })
      }),
      app.get('/api/customerList', (req, res) => {
          res.json({
              errno: 0,
              data: customerList
          })
      }),
      app.get('/api/customerListDetail', (req, res) => {
          res.json({
              errno: 0,
              data: customerListDetail
          })
      }),
      app.get('/api/unrefund', (req, res) => {
          res.json({
              errno: 0,
              data: unrefund
          })
      }),
      app.get('/api/history', (req, res) => {
          res.json({
              errno: 0,
              data: history
          })
      }),
      app.get('/api/refundDetail', (req, res) => {
          res.json({
              errno: 0,
              data: refundDetail
          })
      }),
      app.get('/api/attachment', (req, res) => {
          res.json({
              errno: 0,
              data: attachment
          })
      }),
      app.get('/api/refund', (req, res) => {
          res.json({
              errno: 0,
              data: refund
          })
      }),
      app.get('/api/status', (req, res) => {
          res.json({
              errno: 0,
              data: status
          })
      }),
      app.get('/api/processedHistory', (req, res) => {
          res.json({
              errno: 0,
              data: processedHistory
          })
      }),
      app.get('/api/processedRefundDetail', (req, res) => {
          res.json({
              errno: 0,
              data: processedRefundDetail
          })
      }),
      app.get('/api/monitor', (req, res) => {
          res.json({
              errno: 0,
              data: monitor
          })
      }),
      app.get('/api/storeType', (req, res) => {
          res.json({
              errno: 0,
              data: storeType
          })
      }),
      app.get('/api/storeInfo', (req, res) => {
          res.json({
              errno: 0,
              data: storeInfo
          })
      }),
      app.get('/api/role', (req, res) => {
          res.json({
              errno: 0,
              data: role
          })
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
