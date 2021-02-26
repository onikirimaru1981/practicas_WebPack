const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {


    mode: 'production',// Si cambiamos a production minimiza el archivo.js generado

    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin()],// Este plugin nos permite minimizar el ccs generado
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        })],
    },
    entry: './src/index.js',// Aqui indicamos que archivo js queremos que compile webpack
    output: {


        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "disc"),// Aqui le decimos donde queremos que genere el archivo js


        // Aqui decimos que nombre queremos que tenga
    },
    module: {

        rules: [

            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8 * 1024,
            //                 esModule: false,
            //                 publicPath: './'
            //             },
            //         },
            //     ],
            // },

            {
                test: /\.html$/i,// Aqui le decimos a webpack las reglas de cual html queremos aplicar cambios
                loader: 'html-loader',// Aqui decimos el plugin que queremos que ejecute
                options: {
                    minimize: true,// Este codigo nos permite miminizar el html
                },
            },
            {
                test: /\.css$/,// Aqui le decimos a webpack las reglas de cual ccs queremos aplicar cambios
                exclude: /style\.css$/,//// Aqui le decimos a webpack las reglas para excluir archivos css 
                //de los cuales no queremos aplicar estos cambios
                use: [
                    'style-loader',// Aqui decimos el plugin que queremos que ejecute
                    'css-loader'// Aqui decimos el plugin que queremos que ejecute
                ]
            },
            {
                test: /style\.css$/,// Aqui le decimos a webpack las reglas de cual ccs queremos aplicar cambios
                use: [
                    MiniCssExtractPlugin.loader,// sintaxis de plugin para generar un css en la build(carpeta dist)
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',

                        options: {

                            esModule: false,
                        },

                    }
                ]

            }
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({// plugin para generar html de la compilacion
            filename: './index.html',// Opciones del plugin
            template: './src/index.html',// Opciones del plugin
        }),
        new MiniCssExtractPlugin({// // plugin para generar html de la compilacion
            filename: '[style].css',// Opciones del plugin
            ignoreOrder: false// Opciones del plugin
        }),
        new CleanWebpackPlugin(),


        // new CopyPlugin({
        //     patterns: [{ from: 'src/assets', to: 'assets' }]
        // }),


    ]
}





