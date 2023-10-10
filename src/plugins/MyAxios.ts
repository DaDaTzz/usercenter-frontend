import axios from "axios";


const myAxios = axios.create({
    // baseURL: 'http://8.130.133.165:8090/api',
    baseURL: 'http://localhost:8090/api',
    timeout: 10000,
    //headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token != null) {
        config.headers.Authorization = token;
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    if (response.data.code === 40002 || response.data.code === 40003 || response.data.code === 40006) {
        window.location.href = '/'
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;