const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlStringReplace = require('html-string-replace-webpack-plugin')

module.exports = {
  entry: {
    "index": "./src/index.js",
  },
  resolve: {
    extensions: [ ".js", ".html", ".npy", ".json" ]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js",
    chunkFilename: "[name].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        loader: "svelte-loader"
      },
      {
        test: /\.(npy|npc)$/,
        exclude: /node_modules/,
        loader: 'numpy-loader',
        options: {
          outputPath: 'data/'
        }
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: 'json-loader',
        options: {
          outputPath: 'data/'
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: true,
          removingTagAttrs: ["font-family"]
        }
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: 'file',
        options: {
          outputPath: 'images/'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs", 
      filename: "index.html", 
      chunks: ["index"]
    }),
    new CopyWebpackPlugin([ { from: 'static/' } ]),
    new HtmlStringReplace({
      enable: true,
      patterns: [{
        match: /<d-cite\s+key="([^"]*)"\s*\/>/g,
        replacement: (_, key) => '<d-cite key="' + key + '"></d-cite>'
      }]
    })
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true,
    stats: "minimal",
    contentBase:  __dirname + "/public"
  },
  devtool: "inline-source-map"
}
