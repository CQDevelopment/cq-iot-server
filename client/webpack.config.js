const path = require('path');

module.exports = {
    entry: {
        'bundle': './index.ts',
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, '../build/client')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            {
                enforce: "pre",
                test: /\.s?css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },

            {
                test: /\.(png|svg|eot|ttf|woff|woff2)/,
                loader: 'url-loader',
                options: {
                    limit: 102400,
                    name: "fonts/[name].[ext]",
                    publicPath: '/assets/'
                }
            }
        ]
    }
};