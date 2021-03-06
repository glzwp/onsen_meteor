const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there
const pkg = require('../package.json');

exports.indexTemplate = function (options) {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                template: require('html-webpack-template'),
                title: options.title,
                appMountId: options.appMountId,
                inject: false
            })
        ]
    };
}
exports.loadJSX = function (include) {
    return {
        module: {
            loaders: [
                {
                    // Set up jsx. This accepts js too thanks to RegExp
                    test: /\.(js|jsx)$/,
                    // Enable caching for improved performance during development
                    // It uses default OS directory by default. If you need something
                    // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                    loaders: ['babel?cacheDirectory'],
                    include: include
                }
            ]
        }
    };
}

exports.loadIsparta = function (include) {
    return {
        module: {
            preLoaders: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['isparta-instrumenter'],
                    include: include
                }
            ]
        }
    };
}
exports.lintJSX = function (include) {
    return {
        module: {
            preLoaders: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['eslint'],
                    include: include
                }
            ]
        }
    };
}

exports.enableReactPerformanceTools = function () {
    return {
        module: {
            loaders: [
                {
                    test: require.resolve('react'),
                    loader: 'expose?React'
                }
            ]
        }
    };
}
exports.devServer = function (options) {
    const ret = {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };

    if (options.poll) {
        ret.watchOptions = {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000
        };
    }

    return ret;
}

exports.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: paths
                }
            ]
        }
    };
}

exports.setupFont = function () {
    return {
        module: {
            loaders: [
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file"
                },
                {
                    test: /\.(woff|woff2)$/,
                    loader: "url?prefix=font/&limit=5000"
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/octet-stream"
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=image/svg+xml"
                }
            ]
        }
    };
}

exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
}

exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}
exports.extractBundle = function (options) {
    const entry = {};
    if (!options.exclude) {
        //console.log("Exclusion not_defined!");
        entry[options.name] = options.entries;
    }
    else {
        console.log("Exclusion is defined!");
        entry[options.name] = Object.keys(pkg.dependencies).filter(function (v) {
            return v !== options.exclude;
        });
    }

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest'],

                // options.name modules only
                minChunks: Infinity
            })
        ]
    };
}

exports.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
}

exports.extractCSS = function (paths) {
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };
}

exports.npmInstall = function (options) {
    options = options || {};

    return {
        plugins: [
            new NpmInstallPlugin(options)
        ]
    };
}