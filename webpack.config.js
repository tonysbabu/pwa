const path = require("path");
const webpack = require("webpack");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/App.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node-modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }]
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: "NetworkFirst"
        }
      ]
    })
  ]
};
