
import request from "@/utils/request";

// 查询歌单是否有这首歌
export function searchUserListenApi(id){
  return request({
    method:'GET',
    url:`/userdetail/searchListen?id=${id}`,
  })
}

// 添加播放列表歌曲
export function addListenApi(musicId,userId){
  return request({
    method:'POST',
    url:`/userdetail/addListen`,
    data:{musicId,userId}
  })
}

// 更新这首歌的播放列表状态
export function addUpdateListen(musicId,userId){
  return request({
    method:'POST',
    url:`/userdetail/addUpdateListen`,
    data:{musicId,userId}
  })
}


// 查询是否喜欢
export function getIsListenLike(id,userId){
  return request({
    method:'GET',
    url:`listen/isListenLike?id=${id}&userId=${userId}`
  })
}

// 删除喜欢
export function setRemoveLike(id,userId){
  return request({
    method:'POST',
    url:`listen/removeLike`,
    data:{id,userId}
  })
}

// 添加喜欢
export function setAddLikeInsert(id,userId){
  return request({
    method:'POST',
    url:`listen/addLikeInsert`,
    data:{id,userId}
  })
}

// // 添加喜欢
// export function setAddLikeUpdate(id,userId){
//   return request({
//     method:'POST',
//     url:`listen/addLikeUpdate`,
//     data:{id,userId}
//   })
// }

// 从听歌列表清除
export function removeListen(id,userId){
  return request({
    method:'POST',
    url:`listen/removeListen`,
    data:{id,userId}
  })
}

// 批量从听歌列表清除
export function removeListenLot(userId){
  return request({
    method:'POST',
    url:`listen/removeListenLot`,
    data:{userId}
  })
}


// 批量添加听歌列表
export function addListenLot(userId,musicIdArr){
  return request({
    method:'POST',
    url:`listen/addListenLot`,
    data:{userId,musicIdArr}
  })
}
