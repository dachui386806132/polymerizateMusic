import axios from 'axios'

const request = axios.create({
  baseURL:'http://localhost:4000',
  timeout:60000
})


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