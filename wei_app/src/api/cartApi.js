import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getCartListData(ids) {
        let url = baseURl + '/shopcart'
        // 参数1 路径  参数2 参数
        return require.get(url, {
            params: ids
        })
    },

}