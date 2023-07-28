const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/ace-builds/src-noconflict', to: 'static/js' }
            ],
        })
    );
    return config;
};
