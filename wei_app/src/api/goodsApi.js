import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getGoodsListData(id) {
        let url = baseURl + '/goodslist/' + id
        // 参数1 路径  参数2 参数
        return require.get(url)
    },
    getGoodsInfoData(id) {
        let url = baseURl + '/goodsinfo/' + id
        return require.get(url)
    }
}