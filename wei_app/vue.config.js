module.exports = {
    lintOnSave: false,//这里禁止使用eslint-loader
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/assets/css/index.scss";`,
            },
        }
    }
}