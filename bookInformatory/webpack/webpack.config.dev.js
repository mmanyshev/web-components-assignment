
"use strict";

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const locations = require("./locations.js");
const baseConfiguration = require("./webpack.config.base.js");

module.exports = baseConfiguration({

  mode: "development",

  entry: {
    main: path.join(locations.SOURCE_FOLDER, "app"),
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },

  devtool: "eval-source-map",
  performance: { hints: false },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [

    new HtmlWebpackPlugin({
      inject: true,
      template: locations.INDEX_HTML_FILE_PATH,
    }),

  ],

});
