import request from "@/utils/requestCloud";

// 获取热门搜索
export function getHotSearch(){
  return request({
    method:'GET',
    url:`/search/hot/detail`,
  })
}

// 搜索建议
export function getSuggest(text){
  return request({
    method:'GET',
    url:`/search/suggest?keywords=${text}`,
  })
}

// 搜索
export function getSearch(text,type,limit,offset=0){
  return request({
    method:'GET',
    url:`/cloudsearch?keywords=${text}&type=${type}&limit=${limit}&offset=${offset}`,
  })
}

// 获取歌单详情
export function getSongList(id){
  return request({
    method:'GET',
    url:`/playlist/detail?id=${id}`,
  })
}

// 获取歌单评论
export function getSongListComment(id,limit,offset=0){
  return request({
    method:'GET',
    url:`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`,
  })
}

// 获取mv
export function getMv(id){
  return request({
    method:'GET',
    url:`/mv/url?id=${id}`,
  })
}

// 获取mv信息
export function getMvMsg(id){
  return request({
    method:'GET',
    url:`/mv/detail?mvid=${id}`,
  })
}

// 获取mv评论
export function getMvComment(id){
  return request({
    method:'GET',
    url:`/comment/mv?id=${id}`,
  })
}

// 获取专辑信息
export function getAlbumMsg(id){
  return request({
    method:'GET',
    url:`/album?id=${id}`,
  })
}

// 获取专辑详细信息
export function getAlbumDetail(id){
  return request({
    method:'GET',
    url:`/album/detail/dynamic?id=${id}`,
  })
}

// 获取专辑评论
export function getAlbumComment(id){
  return request({
    method:'GET',
    url:`/comment/album?id=${id}`,
  })
}

// 获取歌曲评论
export function getSongComment(id,limit=0,offset=0){
  return request({
    method:'GET',
    url:`/comment/music?id=${id}&limit=${limit}&offset=${offset}`,
  })
}

// 获取歌手信息
export function getSinger(id){
  return request({
    method:'GET',
    url:`/artist/detail?id=${id}`,
  })
}

// 获取歌手专辑
export function getSingerAlbum(id){
  return request({
    method:'GET',
    url:`/artist/album?id=${id}`,
  })
}

// 获取歌手MV
export function getSingerMv(id){
  return request({
    method:'GET',
    url:`/artist/mv?id=${id}`,
  })
}

// 获取歌手单曲
export function getSingerSongs(id){
  return request({
    method:'GET',
    url:`/artists?id=${id}`,
  })
}

// 获取歌手全部歌曲
export function getSingerSongsAll(id){
  return request({
    method:'GET',
    url:`/artist/songs?id=${id}`,
  })
}

// 获取相似
export function getSimiSinger(id){
  return request({
    method:'GET',
    url:`/simi/artist?id=${id}`,
  })
}

// 搜索歌手分类
export function getTypeSinger(initial=-1,type=-1,area=-1,limit=100,offset=0){
  return request({
    method:'GET',
    url:`/artist/list?initial=${initial}&type=${type}&area=${area}&limit=${limit}&offset=${offset} `,
  })
}

// 获取mv分类
export function getMvList(area='',limit=30,offset=0){
  return request({
    method:'GET',
    url:`/top/mv?area=${area}&limit=${limit}&offset=${offset}`,
  })
}

// 获取电台
export function getPersonalized(){
  return request({
    method:'GET',
    url:`/dj/hot`,
  })
}


// 获取精品歌单
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 20
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export function getTopPlayList(cat){
  return request({
    method:'GET',
    url:`/top/playlist/highquality?&limit=40&cat=${cat}`,
  })
}
