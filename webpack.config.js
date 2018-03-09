var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.join(__dirname, 'public'),
    DEV_DIR = path.join(__dirname, 'frontend');
module.exports = {
    context: DEV_DIR,
    entry: ['./bootstrap.js'],

    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
        new HtmlWebpackPlugin({
            template: path.join(DEV_DIR, 'index.html')
        })
    ],
    resolve: {
        alias: {
            Components: path.resolve(DEV_DIR, './components')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        // Special compilation rules
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react','env']
                }
            },
            {
                test: /\.(png|svg|jpg|gif\ttf|eot)$/,
                use: [
                    'file-loader?name=[path][name].[ext]'
                ]
            }
        ]
    }
}