import axios from 'axios'

// const request = axios.create({
//   url:'https://autumnfish.cn/',
// })

const request = axios.create({
  baseURL:'http://localhost:3001',
  timeout:60000
})

// request.interceptors.request.use(
//    function (config){
//      console.log("全局请求拦截")
//      console.log(config)
//      console.groupEnd()
//      // config.headers.token = "12312"
//      return config;
//    }, (err)=>Promise.reject(err)
//
// )
//
//
// request.interceptors.response.use(
//    function (response){
//      console.log("全局响应拦截")
//      console.log(response)
//      console.groupEnd()
//      return response;
//    }, (err)=>Promise.reject(err)
// )

export function get(url, params){
  return request.get(url,{
    params
  })
}

export function post(url, data){
  return request.post(url,data)
}

export function del(url){
  return request.delete(url);
}

export function put(url, data){
  return request.put(url, data)
}

export default request