import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getOrderData(obj) {
        let url = baseURl + '/order/create'
        // 参数1 路径  参数2 参数
        return require.post(url, obj)
    },
    getOrderList() {
        let url = baseURl + '/order/list'
        // 参数1 路径  参数2 参数
        return require.get(url)
    },
    // 查询订单详情
    searchOrderDetail(id) {
        let url = baseURl + '/order/show?id=' + id
        return require.get(url)
    },
    // 取消订单
    cancelOrder(id) {
        let url = baseURl + '/order/cancel'
        return require.post(url, { id })
    }
}