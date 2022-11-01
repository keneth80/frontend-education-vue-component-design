const {defineConfig} = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        // axios adapter를 구동하기 위한 polyfill 설정.
        plugins: [new NodePolyfillPlugin()]
    }
});
