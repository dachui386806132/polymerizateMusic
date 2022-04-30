import request from "@/utils/requestCloud";


// 批量获取歌曲信息的接口
export function getMusicMessageApi(idList){
  return request({
    method:'GET',
    url:`/song/detail?ids=${idList.join()}`,
  })
}

// 获取单个歌曲信息的接口
export function getMusicMsgApi(idList){
  return request({
    method:'GET',
    url:`/song/detail?ids=${idList}`,
  })
}

// 获取歌词
export function getMusicWordsApi(id){
  return request({
    method:'GET',
    url:`/lyric?id=${id}`,
  })
}

// 获取歌曲地址
export function getMusicUrlApi(id){
  return request({
    method:'GET',
    url:`/song/url?id=${id}`,
  })
}


