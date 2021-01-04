import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getCategoryData() {
        let url = baseURl + '/category'
        return require.get(url)
    },

}