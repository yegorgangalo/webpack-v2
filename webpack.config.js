const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', //шлях до точки входу відносно даного файлу налаштувань
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',//назва файлу, куди буде записано весь код з усіх файлів js
        publicPath: '',
    },
    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: "babel-loader"
            },
            {
              test: /\.s[ac]ss$/i,
              use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader","sass-loader"],
            },
            {
              test: /\.(png|jpe?g|svg|gif)$/i,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'images',
                      },
                    },
                    {
                      loader: 'image-webpack-loader',
                      options: {
                          mozjpeg: {
                              progressive: true,
                              quality: 70,
                          },
                          webp: {
                            quality: 70,
                          },
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.75],
                            speed: 4
                          },
                      },
                    }
                ],
            },
        ],
    },
  plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css'}),
      new HtmlWebpackPlugin({ template: "./src/index.html" })
  ],
};