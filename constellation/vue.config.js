module.exports = {
    devServer: {
        // port: 8001, // 端口号，如果端口被占用，会自动提升 1
        open: true, // 启动服务自动打开浏览器
        https: false, // 协议
        host: "localhost", // 主机名，也可以 127.0.0.1 或 做真机测试时候 0.0.0.0
        proxy: {
            '/almanac-api': {
                target: "http://v.juhe.cn", // 目标服务器 
                changeOrigin: true, // 开启代理 
                pathRewrite: {
                    '^/almanac-api': ''
                }
            }
        }
    },
    lintOnSave: false,//这里禁止使用eslint-loader
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/assets/index.scss";`,
            },
        }
    }
}