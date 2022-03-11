// 对axios进行二次封装，并且指定项目的跟地址
import axios from "axios";

axios.defaults.baseURL='http://localhost:3000'

export default axios