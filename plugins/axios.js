import axios from 'axios';

//创建axios实例
const service = axios.create({
    baseURL: 'http://192.168.1.109:5588',//api的base_url
    timeout: 30000, //请求超时
})
export default service