import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    isRegister(obj) {
        let url = baseURl + '/register'
        return require.post(url, obj)
    }
}