import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');
const ASSETS = path.resolve(APP_DIR, './assets');

module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        `${APP_DIR}/app.js`
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'source-map-loader'
                ],
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                include: `${ASSETS}/images`,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'dist/assets/images/',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.jsx',
            '.js'
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `index.html`,
            favicon: '',
            meta: {},
            minify: false,
            hash: false,
            cache: false,
        }),
        new webpack.ProvidePlugin({
            React: 'react', // ReactJS module name in node_modules folder
        }),
    ],
    optimization: {
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
        },
    },
};
