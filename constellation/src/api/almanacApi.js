import request from '../utils/request'
// const key = "ee14e85babbc356324965e633cf7a923"
const key = '7d2867c343c385c04a38f73580571c56 '
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