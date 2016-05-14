var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");
var cssnext = require("postcss-cssnext");
var cssimport = require("postcss-import");

module.exports = {
    entry: [
        "./dist/index.js"
    ],
    output: {
        path: __dirname + "/dist",
        filename: "dist.js",
        publicPath: "/"
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-dom/server": "ReactDOMServer",
        "lodash": "_"
    },
    resolveLoader: {
        packageMains: ['json']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loaders: [
                    "style-loader",
                    "css-loader?modules",
                    "postcss-loader"
                ]
            }
        ]
    },
    postcss: [
        cssimport({
        }),
        cssnext({
        }),
        autoprefixer({ browsers: ['last 2 version'] })
    ],
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"',
            }
        })
    ]
}
