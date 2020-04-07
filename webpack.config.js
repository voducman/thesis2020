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
        
    },
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, 'public/javascripts'),
    },
    mode: 'development'

}