var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');

var node_dir = path.join(__dirname, 'node_modules');
var bower_dir = path.join(__dirname, 'bower_components');
var assets_dir = path.join(__dirname, 'assets');
var app_dir = path.join(__dirname, 'app');

module.exports = {
    devtool: 'eval',
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',

        // Application entry point
        app_dir + '/main.js'
    ],
    output: {
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        root: [
            bower_dir,
            assets_dir,
            app_dir
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new ExtractTextPlugin('main.css')
    ],
    module: {
        loaders: [
            // CSS
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },

            // SASS
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!sass'
                )
            },

            // ES2015
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};
