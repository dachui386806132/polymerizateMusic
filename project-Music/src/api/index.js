import request from "@/utils/requestCloud";

// 歌单推荐
export function getHotSongList(){
  return request({
    method:'GET',
    url:`/personalized`,
  })
}

// 新歌推荐
export function getNewSongs(limit){
  return request({
    method:'GET',
    url:`/personalized/newsong?limit=${limit}`,
  })
}

// 新碟推荐  area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
export function getNewAlbum(area='ZH',limit=30,offset=0){
  return request({
    method:'GET',
    url:`/album/new?area=${area}&limit=${limit}&offset=${offset}`,
  })
}



// 电台推荐
export function geHotRadio(){
  return request({
    method:'GET',
    url:`/personalized/djprogram`,
  })
}

// MV推荐
export function getHotMv(){
  return request({
    method:'GET',
    url:`/personalized`,
  })
}

// 最新MV推荐
export function getNewMv(limit= 10 ,area= '全部'){
  return request({
    method:'GET',
    url:`/mv/first?limit=${limit}&area=${area}`,
  })
}

// 轮播图 type
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
export function getBanner(type=0){
  return request({
    method:'GET',
    url:`/banner?type=${type}`,
  })
}

// 独家放送推荐入口
export function getNewOutGet(){
  return request({
    method:'GET',
    url:`/personalized/privatecontent `,
  })
}

// 独家放送推荐列表
export function getNewOutGetList(){
  return request({
    method:'GET',
    url:`/personalized/privatecontent/list `,
  })
}

// 所有榜单内容摘要
export function getTopListDetail(){
  return request({
    method:'GET',
    url:`/toplist/detail`,
  })
}
// 根据id获取榜单内容
export function getTopList(id){
  return request({
    method:'GET',
    url:`/top/list?id=${id}`,
  })
}








