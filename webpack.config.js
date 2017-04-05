var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/app.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "./app/"
    },
    watch: true,
    module: {
        loaders: [
            /*
			{
				test: /\.js$/, // include .js files
				enforce: "pre", // preload the jshint loader
				exclude: /node_modules/, // exclude any and all files in the node_modules folder
				use: [
					{
						loader: "jshint-loader"
					}
				]
			},*/
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: 
                "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }, 
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                })
            },
            {
                test:/\.gif$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/main.css'),
        new HtmlWebpackPlugin({
            template: '!pug-loader' + '!' + SRC_DIR + '/app/index.pug'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist") +  "/app",
        inline: true,
           headers: {
        "Access-Control-Allow-Origin": "*",
    }
    }
};

module.exports = config;