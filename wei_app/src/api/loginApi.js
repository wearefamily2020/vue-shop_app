import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    // 登录接口
    login(obj) {
        let url = baseURl + '/login'
        return require.post(url, obj)
    },

    // 登录验证
    checkLogin() {
        let url = baseURl + '/user'
        return require.get(url)
    },
    // 退出登录
    logout() {
        let url = baseURl + '/logout'
        return require.get(url)
    }
}