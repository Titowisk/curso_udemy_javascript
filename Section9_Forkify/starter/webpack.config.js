const path = require('path') // built-in node module
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    // https://babeljs.io/docs/en/babel-polyfill/
    output: {
        // https://nodejs.org/api/path.html#path_path_resolve_paths
        // https://nodejs.org/docs/latest/api/modules.html#modules_dirname
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // to all the javascript files will be applied the following rule
                exclude: /node_modules/, // babel-loader must only be applied to the javascript files in the project
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}