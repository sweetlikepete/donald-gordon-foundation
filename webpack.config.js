/*
    eslint
    import/unambiguous: 0,
    import/no-commonjs: 0,
    node/exports-style: 0,
    @typescript-eslint/no-var-requires: 0,
    max-lines-per-function: 0,
    require-unicode-regexp: 0
*/


const path = require("path");

const nodeExternals = require("webpack-node-externals");


const config = function(env){

    const base = process.cwd();
    const platform = env.platform === "web" ? "web" : "node";

    return {
        cache: true,
        devtool: !env.production && platform === "web" ? "source-maps" : "none",
        entry: platform === "web" ? "./src/app/client" : "./src/app/server",
        externals: [
            nodeExternals({
                whitelist: [/^babel-plugin-universal-import/]
            })
        ],
        mode: env.production ? "production" : "development",
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            comments: false,
                            plugins: [
                                "universal-import",
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-proposal-class-properties"
                            ],
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            esmodules: true
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        },
        output: {
            filename: `build/${ env.platform === "web" ? "client" : "server" }/[name]${ platform === "web" ? ".[chunkhash]" : "" }.js`,
            path: path.resolve(base),
            publicPath: "/"
        },
        resolve: {
            extensions: [".js"],
            modules: [
                "node_modules",
                "src"
            ],
            symlinks: false
        },
        target: platform
    };

};

module.exports = config;
