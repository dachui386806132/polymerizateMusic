import request from "@/utils/request";

// 获取用户所有歌单
export function getSongList(userId){
  return request({
    method:'GET',
    url:`/songList/getList?userId=${userId}`,
  })
}

// 查询用户单个歌单的歌曲数量
export function getListNum(listId){
  return request({
    method:'GET',
    url:`/songList/getListNum?listId=${listId}`,
  })
}

// 查询用户我喜欢歌单的歌曲数量
export function getLikeNum(userId){
  return request({
    method:'GET',
    url:`/songList/getLikeNum?userId=${userId}`,
  })
}

// 创建歌单
export function createList(userId,listName,about){
  return request({
    method:'POST',
    url:`/songList/createList`,
    data:{userId,listName,about}
  })
}

// 查询歌单是否有此歌曲
export async function isListSong(listId,musicId){
  let {data:res} = await request({
    method:'GET',
    url:`/songList/isListSong?listId=${listId}&musicId=${musicId}`,
  })
  return res.data.length
}

// 给歌单添加歌曲
export function appendListSong(listId,songId){
  return request({
    method:'POST',
    url:`/songList/appendListSong`,
    data:{listId,songId}
  })
}

// 给歌单更换封面
export function setListImg(listId,url){
  return request({
    method:'POST',
    url:`/songList/setListImg`,
    data:{listId,url}
  })
}

// 删除歌单
export function removeList(listId){
  return request({
    method:'POST',
    url:`/songList/removeList`,
    data:{listId}
  })
}

// 查询歌单信息
export function searchList(listId){
  return request({
    method:'POST',
    url:`/songList/searchList?listId=${listId}`,
  })
}

// 查询歌单所有歌曲
export function searchListSong(listId){
  return request({
    method:'GET',
    url:`/songList/searchListSong?listId=${listId}`,
  })
}

