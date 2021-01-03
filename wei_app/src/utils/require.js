import axios from 'axios'
import auth from './auth'
// 二次封装axios
let request = axios.create({
    baseURL: process.env.VUE_APP_SERVICE_URL,  // 基础路径
    timeout: 3000,   // 响应时间
    // headers:{},
})

// 请求拦截器
request.interceptors.request.use(config => {
    // 将保存在session_id放入到下次请求的header中
    config.headers.Authorization = auth.getAuthorization()
    return config;
}, error => {
    // 出现异常
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
    let jsonStr = response.data.slice(response.data.indexOf("{"));
    let data = JSON.parse(jsonStr);
    return data;
}, error => {
    return Promise.reject(error);
})


export default request