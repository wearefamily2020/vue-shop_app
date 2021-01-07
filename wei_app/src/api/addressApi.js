import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    // 保存地址
    saveAddress(obj) {
        let url = baseURl + '/address/save'
        return require.post(url, obj)
    },
    // 获取地址
    getAddress() {
        let url = baseURl + '/address'
        return require.get(url)
    },
    // 编辑地址
    editAddress(id) {
        let url = baseURl + '/address/edit?id=' + id
        return require.get(url)
    },
    // 删除地址
    delAddress(obj) {
        let url = baseURl + '/address/del'
        return require.post(url, obj)
    },
    // 默认收获地址
    defaultAddress(id) {
        let url = baseURl + '/address/def?id=' + id
        return require.get(url)
    }
}