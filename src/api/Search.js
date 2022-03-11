// 统一管理所有需要的url地址，封装网络请求的方法并导出
import request from '@/utils/request'


//搜索-热搜列表简略  用于热搜关键词
export const hotItem = params => request({
    url:'/search/hot',
    params
})

export const searchResultList = params => request({
    url:'/cloudsearch',
    params
})