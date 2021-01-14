import request from '../utils/request'
// const key = "3ee3f17b61c2705d275296b3b8b08dd8"
const key = "70493adef4dea94dba03ce8b9632c9ee"  

export default {
    getConstellation(consName, type) {
        let url = '/gril-api/constellation/getAll'
        return request.get(url, {
            params: {
                consName,
                type,
                key
            }
        })
    }
}