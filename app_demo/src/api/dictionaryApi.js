import request from '../utils/require'
const key = "f519c4ed913ea9d1be896955dfc8b8e2"
export default {
    queryDictionary(word) {
        let url = '/dev-api/chengyu/query'
        return request.get(url, {
            params: {
                word,
                key
            }
        })
    }
}