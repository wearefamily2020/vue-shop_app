import axios from 'axios'

const request = axios.create({
    // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
    baseURL: '/',
    timeout: 3000,  // 请求超时
});

//请求拦截器
request.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
})

export default request