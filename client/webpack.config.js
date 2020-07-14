const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js',
		publicPath:'/'
	},
	module: {
		rules: [
			{
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
			{
				test:/\.html$/,
				use : [
					{
						loader:'html-loader'
					}
				]
			},
			{
				test:/\.css$/i,
				use : ['style-loader', 'css-loader'],
			},
			{
				test:/\.(png|jpg|jpeg|gif|svg|eot|ttf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: ['file-loader']
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template:'./src/public/index.html',
			filename:'./index.html',
		}),
		new CleanWebpackPlugin(),
	],
	devServer : {
		historyApiFallback: true,
	}
}