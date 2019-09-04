const path = require("path");

module.exports = {
    entry: [
        "./src/index.js",
        "./src/styles/index.less"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/react"]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            },
            {
                test: /\.(eot|png|jp(e*)g|svg|ttf|otf|woff|woff2)$/,
                loader: "url-loader?limit=100000&mimetype=application/font-woff"
            }
        ]
    }
};
