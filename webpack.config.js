const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('./index.html')],
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'
                    },
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                            name: '[name].[ext]'
                        }},
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug : true,
                            mozjpeg: {
                                progressive: true,
                                quality: 75
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 1
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Simple piskel clone',
            template: "./index.html",
            filename: 'index.html'
        }),
        new CopyPlugin([
            { from: 'icons', to: 'icons' },
            { from: 'frames/frame-icons', to: 'frames/frame-icons' },
            { from: 'landing-page/assets', to: 'assets' },
        ]),
        new MiniCssExtractPlugin({filename: 'main.css'})
    ]
};
