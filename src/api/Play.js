import request from '@/utils/request'

export const getSongById = (id)=>request({
    url:`/song/detail?ids=${id}`,
    method:'GET'
})

export const getLyricById = (id) => request({
    url:`/lyric?id=${id}`,
    method:'GET'
})
