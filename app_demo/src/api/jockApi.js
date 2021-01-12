import request from '../utils/require'
const key = "ee8d72e3cfb1eeb4f006840f8653d068"
const time = '1418816972'
export default {
    getJockData() {
        let url = '/dev-api/joke/content/list.php'
        return request.get(url, {
            params: {
                sort: "asc",
                page: 1,
                pagesize: 10,
                time,
                key
            }
        })
    }
}