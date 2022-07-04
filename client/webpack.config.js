/**
 * Webpack Config
 */
// const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const fs = require('fs');
const process = require('process');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// plugins
// const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    entry: ["babel-polyfill", "react-hot-loader/patch", "./src/index.tsx"],
    output: {
        // The build folder.
        path: resolveApp('dist'),
        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        // We don't currently advertise code splitting but Webpack supports it.
        filename: 'static/js/[name].[fullhash:8].js',
        // chunkFilename: 'static/js/[name].[hash:8].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: publicPath,
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        open: true,
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
            //writeToDisk: true, 
            // This option slows down with a couple of m/s the reloading of the server during 
            //development, include if you want to see the output of the build in dev
            
        }
        
    },
    // resolve alias (Absolute paths)
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['node_modules'],
        alias: {
            //Actions: resolveApp('src/actions/'),
            Components: resolveApp('src/components/'),
            //Assets: resolveApp('src/assets/'),
            //Util: resolveApp('src/util/'),
            //Routes: resolveApp('src/routes/'),
            //Constants: resolveApp('src/constants/'),
            //Helpers: resolveApp('src/helpers/'),
            //Api: resolveApp('src/api/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    //options: { presets: ["@babel/env"]}
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[fullhash:8].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        }
                    }
                ]
            },
            // Scss compiler
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        postcssOptions: {
                            plugins: {
                                autoprefixer: {},
                            }
                        },
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserJsPlugin({
                // Enable file caching
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                terserOptions: {
                    compress: false,
                    ecma: 8,
                    mangle: true,
                    sourceMap: true
                },               
            })
        ]
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
        }),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: './public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "static/css/[name].[fullhash:8].css"
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        }),
        new Dotenv()
        // new BundleAnalyzerPlugin()
    ]
};
