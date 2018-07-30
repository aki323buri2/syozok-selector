const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
	mode: 'production', 
	entry: './test/main.js', 
	output: {
		path: path.resolve(__dirname, 'public'), 
		filename: '[name][hash].js', 
	}, 
	plugins: [
		new ExtractTextWebpackPlugin(
			'[name][hash].css', 
		), 
		new HtmlWebpackPlugin({
			title: 'syozok-selector', 
		}), 
		new CleanWebpackPlugin([
			'public', 
		]),
	], 
	module: {
		rules: [
			{
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				use: [
					{
						loader: 'babel-loader', 
					}, 
				], 
			}, 
			{
				test: /\.(css|s[ac]ss)$/, 
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader', 
					use: [
						{
							loader: 'css-loader', 
						}, 
						{
							loader: 'postcss-loader', 
						}, 
						{
							loader: 'sass-loader', 
						}, 
					], 
				}), 
			}, 
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/, 
				use: [
					{
						loader: 'file-loader', 
						options: { 
							name: path => path.replace(/^.*node_modules\//, 'fonts/vendor/'), 
						}, 
					}, 
				], 
			}, 
		], 
	}, 
};


