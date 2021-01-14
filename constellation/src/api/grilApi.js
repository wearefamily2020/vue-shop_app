import request from '../utils/request'
const key = "3ee3f17b61c2705d275296b3b8b08dd8"

export default {
    getDate(date) {
        let url = '/almanac-api/laohuangli/d'
        return request.get(url, {
            params: {
                date,
                key
            }
        })
    },
    getTime(date) {
        let url = '/almanac-api/laohuangli/h'
        return request.get(url, {
            params: {
                date,
                key
            }
        })
    }
}