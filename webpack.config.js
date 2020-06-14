const path = require('path');

module.exports = {
    entry: {
        login:    './frontend/login.js',
        register: './frontend/register.js',
        utils:    './frontend/utils.js',
        header:   './frontend/header.js',
        sidebar:  './frontend/sidebar.js',
        footer:   './frontend/footer.js',
        profile:  './frontend/profile.js',
        gateway:  './frontend/gateway/controller.js',
        gatewayList: './frontend/manager/gateways.js',
        gatewayPLC:  './frontend/manager/plcs.js',
        gatewayTag:  './frontend/manager/tags.js',
        design:  './frontend/design/design.js',
        drawing:     './frontend/drawing/Controller.js',
        running:  './frontend/run/Controller.js'
    },
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, 'public/javascripts'),
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },

}