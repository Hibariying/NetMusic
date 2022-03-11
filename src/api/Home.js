// 统一管理所有需要的url地址，封装网络请求的方法并导出
import request from '@/utils/request'

//首页-推荐歌单
export const recommendMusic = params => request({
    url:'/personalized',
    params
})

//首页-推荐新音乐
export const newMusic = params => request({
    url:'/personalized/newsong',
    params
})




//歌曲是否可用
export const musicUrl = id=> request({
    url:'/song/url',
    id
})
