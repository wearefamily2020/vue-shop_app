import request from '../utils/request'
const key = "ee14e85babbc356324965e633cf7a923"

export default {
    getDate(date) {
        let url = '/almanac-api/laohuangli/d'
        return request.get(url, {
            params: {
                date,
                key
            }
        })
    }
}