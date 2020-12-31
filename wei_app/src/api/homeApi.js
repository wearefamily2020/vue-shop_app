import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getSwiper() {
        let url = baseURl + '/imglist'
        // 参数1 路径  参数2 参数
        return require.get(url)
    }
}