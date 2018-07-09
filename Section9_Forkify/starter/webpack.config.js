const path = require('path') // built-in node module
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
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
    ]
}