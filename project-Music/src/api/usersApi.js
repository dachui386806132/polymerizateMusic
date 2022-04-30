
import request from "@/utils/request";


// 获取是否登录
export function getIsLoginApi(token){
  return request({
    method:'GET',
    url:`/user/isLogin?TokenKey=${token}`,
  })
}

// 获取是否有此用户
export function getIsUserApi(username){
  return request({
    method:'GET',
    url:`/user/searchUser?username=${username}`,
  })
}

// 注册用户--向数据库添加数据
export function insertUserApi(username,password){
  return request({
    method:'POST',
    url:`/user/login`,
    data:{username,password}
  })
}

// 用户登录--向数据库查询用户,返回token
export function userLoginApi(username,password){
  return request({
    method:'POST',
    url:`/user/userLogin`,
    data:{username,password}
  })
}

// 获取用户喜欢的歌曲id 每页十个
export function userLikeSongApi(id,start){
  return request({
    method:'GET',
    url:`/userdetail/userLikeSong?id=${id}&start=${start}`,
  })
}

// 获取用户所有喜欢歌曲id
export function userLikeSongAll(id){
  return request({
    method:'GET',
    url:`/userdetail/userLikeSongAll?id=${id}`,
  })
}

// 获取用户喜欢的歌曲数量
export async function userLikeNumApi(id){
  let {data:res} =  await request({
    method:'GET',
    url:`/userdetail/userLikeNum?id=${id}`,
  })
  return res.data[0].music_id
}

// 获取用户歌曲列表
export async function userListenListApi(id){
  return request({
    method:'GET',
    url:`/userdetail/userListenList?id=${id}`,
  })
}


// 获取用户个人信息
export async function getMyMessage(id){
  return request({
    method:'POST',
    url:`/userdetail/getMyMessage`,
    data:{id}
  })
}

// 更改用户名信息
export async function changeUsername( username , userId ){
  return request({
    method:'POST',
    url:`/user/changeUsername`,
    data:{ username , userId }
  })
}


// 更改网名
export async function changeStr( str , userId ){
  return request({
    method:'POST',
    url:`/user/changeStr`,
    data:{ str , userId }
  })
}

// 更改头像
export async function changeHead( base64 , userId ){
  return request({
    method:'POST',
    url:`/user/changeHead`,
    data:{ base64 , userId }
  })
}

// 私人fm
export async function getPersonalFm(){
  return request({
    method:'GET',
    url:`/user/changeHead`,
  })
}

