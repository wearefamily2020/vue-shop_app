import axios from 'axios'
// 二次封装axios
let request = axios.create({
    baseURL: 'http://localhost:8080',  // 基础路径
    timeout: 3000,   // 响应时间
    // headers:{},
})


export default request