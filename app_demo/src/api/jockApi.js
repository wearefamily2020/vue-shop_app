import request from '../utils/require'
const key = "ee8d72e3cfb1eeb4f006840f8653d068"
const time = '1418816972'
export default {
    // 按时间
    getTimeJockData(page = 1, pagesize = 10) {
        let url = '/dev-api/joke/content/list.php'
        return request.get(url, {
            params: {
                sort: "asc",
                page,
                pagesize,
                time,
                key
            }
        })
    },
    // 按最新
    getNewJockData(page = 1, pagesize = 10) {
        let url = '/dev-api/joke/content/text.php'
        return request.get(url, {
            params: {
                page,
                pagesize,
                key
            }
        })
    },
    // 按随机
    getRandomJockData(page = 1, pagesize = 10) {
        let url = '/dev-api/joke/randJoke.php'
        return request.get(url, {
            params: {
                // page,
                // pagesize,
                key
            }
        })
    },
}