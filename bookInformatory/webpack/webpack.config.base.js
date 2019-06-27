
"use strict";

const webpack = require("webpack");

const locations = require("./locations.js");

module.exports = (options) => ({

  mode: options.mode,
  entry: options.entry,

  output: Object.assign(

    {
      path: locations.DIST_FOLDER,
      publicPath: "/",
    },

    options.output,

  ),

  resolve: {
    modules: [ "node_modules", locations.SOURCE_FOLDER ],
    extensions: [ ".ts", ".tsx", ".js" ],
    mainFields: [ "browser", "jsnext:main", "main" ],
  },

  target: "web",
  devtool: options.devtool,

  performance: options.performance || {},
  optimization: options.optimization,

  module: {

    rules: [

      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
      },

      {
        test: /\.css$/,
        use: "css-loader",
      },

      {
        test: /\.html$/,
        use: "html-loader",
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10 * 1024, // Inline files smaller than 10 kB
              noquotes: true,
            },
          },
        ],
      },

      {
        test: /\.(jpg|png|gif)$/,
        use: [

          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024, // Inline files smaller than 10 kB
            },
          },

          {
            loader: "image-webpack-loader",
            options: {

              mozjpeg: {
                enabled: false,
              },

              gifsicle: {
                interlaced: false,
              },

              optipng: {
                optimizationLevel: 7,
              },

              pngquant: {
                quality: "65-90",
                speed: 4,
              },

            },
          },

        ],
      },

    ],
  },

  plugins: [

    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),

    ...options.plugins,

  ],

  devServer: Object.assign(

    {

      port: 3000,
      hot: false,
      contentBase: locations.DIST_FOLDER,

    },

    options.devServer,

  ),

});
