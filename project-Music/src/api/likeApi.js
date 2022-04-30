import request from "@/utils/request";


// 从听歌列表清除
export function removeLikeApi(id,userId){
  return request({
    method:'POST',
    url:`listen/removeLike`,
    data:{id,userId}
  })
}

// 收藏专辑
export function likeAlbum(albumId,userId){
  return request({
    method:'POST',
    url:`like/likeAlbum`,
    data:{albumId,userId}
  })
}

// 收藏歌单
export function likeSongList(songListId,userId){
  return request({
    method:'POST',
    url:`like/likeSongList`,
    data:{songListId,userId}
  })
}

// 取消喜欢专辑
export function removeLikeAlbum(albumId,userId){
  return request({
    method:'POST',
    url:`like/removeLikeAlbum`,
    data:{albumId,userId}
  })
}

// 取消喜欢歌单
export function removeLikeSongList(songListId,userId){
  return request({
    method:'POST',
    url:`like/removeLikeSongList`,
    data:{songListId,userId}
  })
}

// 查询是否喜欢专辑
export async function isAlbumLike(albumId,userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/isAlbumLike`,
    data:{albumId,userId}
  })
 return res.data.length
}

// 查询是否喜欢歌单
export async function isSongListLike(songListId,userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/isSongListLike`,
    data:{songListId,userId}
  })
  return res.data.length
}

// 查询用户喜欢专辑数量
export async function searchLikeAlbumNum(userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/searchLikeAlbumNum`,
    data:{userId}
  })
  return res.data[0].num
}

// 查询用户喜欢歌曲数量
export async function searchLikeSongNum(userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/searchLikeSongNum`,
    data:{userId}
  })
  return res.data[0].num
}

// 查询用户喜欢歌单数量
export async function searchLikeSongListNum(userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/searchLikeSongListNum`,
    data:{userId}
  })
  return res.data[0].num
}

// 获取用户喜欢专辑
export  async function getLikeAlbum(userId){
  let {data:res} = await  request({
    method:'POST',
    url:`like/getLikeAlbum`,
    data:{userId}
  })
  let arr=[]
    res.data.forEach(item=>{
    return arr.push(item.album_id)
  })
  return arr
}

// 获取用户喜欢歌单
export async function getLikeSongList(userId){
  let {data:res} = await request({
    method:'POST',
    url:`like/getLikeSongList`,
    data:{userId}
  })
  let arr=[]
  res.data.forEach(item=>{
    return arr.push(item.songlist_id)
  })
  return arr

}



