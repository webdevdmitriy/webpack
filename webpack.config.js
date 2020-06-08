let path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// какой режим
const isDev = process.env.NODE_ENV === 'development' // development
const isProd = !isDev // production

// функция возвращает объект, которые подставляется в поле optimization
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
	}
	return config
}

// функция для задания имени файла
// в режиме production имя файла будет содержать [hash]
const filename = folder => {
	const ext = folder === 'css' || folder === 'js' ? folder : `[ext]`
	return isDev ? `${folder}/[name].${ext}` : `${folder}/[name].[hash].${ext}`
}

// функция для loader сss и препроцессоров
const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hrm: isDev, //hot module replacement изменение сущностей без перезагрузки страницы
				reloadAll: true
			}
		},
		'css-loader'
	]
	if (extra) loaders.push(extra)
	return loaders
}
module.exports = {
	mode: 'development', // Режим разработки по умолчанию
	entry: {
		main: ['@babel/polyfill', './src/js/script.js']
	}, //входной файл
	output: {
		filename: filename('js'), // имя конечного файла-сборки
		path: path.join(__dirname, '/dist') // где этот файл будет находится
	},
	optimization: optimization(),
	devServer: {
		host: '192.168.1.51',
		port: 4200,
		hot: isDev // если режим development
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				loader: 'file-loader',
				options: {
					name: filename('fonts')
				}
			},
			{
				test: /\.less$/,
				use: cssLoaders('less-loader')
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			} // exclude исключает папку
		]
	},
	plugins: [
		new CleanWebpackPlugin(), // очистка папки dist
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd // минификация только в режиме production
			}
		}),
		new MiniCssExtractPlugin({
			filename: filename('css') // название конечного файла файла с css
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'img'),
					to: path.resolve(__dirname, 'dist/img')
				},
				{
					from: path.resolve(__dirname, 'css/bootstrap.css'),
					to: path.resolve(__dirname, 'dist/css/bootstrap.css')
				}
			]
		})
	]
}
