const path = require('path');

module.exports = {
    entry: {
        login:    './src/login.js',
        register: './src/register.js',
        utils:    './src/utils.js',
        header:   './src/header.js',
        sidebar:  './src/sidebar.js',
        footer:   './src/footer.js',
        profile:  './src/profile.js',
        gateway:  './src/gateway/main.js',
        gatewayList: './src/manager/list.js',
        gatewayPLC:  './src/manager/plc.js',
        gatewayTag:  './src/manager/tag.js',
        design:  './src/design/design.js',
        drawing:     './src/drawing/Controller.js'
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