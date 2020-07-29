const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: ["@babel/polyfill", "./example/App.jsx"],
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "example"),
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: "babel-loader",
        },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
          }],
    },
    mode: "production",
    plugins: [
        new HtmlWebPackPlugin({
            template: './example/index.html',
            filename: 'index.html'
          })
    ],
    devServer: {
        contentBase: "./example",
        host: "localhost",
        port: 5000,
        open: true
    },
};