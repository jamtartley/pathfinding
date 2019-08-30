const path = require("path");

module.exports = {
    entry: [
        "./src/index.js",
        "./src/index.less"
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
                        presets: ["@babel/preset-env"]
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
            }
        ]
    }
};
