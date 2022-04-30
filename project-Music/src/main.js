import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/index.css'
import './assets/css/font.css'
import './assets/css/base.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import dayjs from "dayjs";

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/img/errImg.png',
  loading: 'assets/img/loadImg.png',
  attempt: 9999
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$imgUrl = 'http://localhost:3001/'

Vue.filter('handlerDay', function (value) {
    return dayjs(value).format('YYYY年 MM月DD日 HH:mm')})

Vue.filter('handlerPublishDay', function (value) {
    return dayjs(value).format('YYYY年 MM月DD日')})

Vue.filter('handlerPublishDayLine', function (value) {
  return dayjs(value).format('YYYY-MM-DD')})

Vue.filter('handlerNull', function (value) {
    if (value === ''|| value===undefined){
      return '无'
    }else {
      return value
    }
  })

Vue.filter('handlerTime', function (value) {
  let f = parseInt((value/ 1000)/60)
  let s = parseInt((value / 1000)%60)
  f = f < 10 ? '0'+f :f
  s = s < 10 ? '0'+s :s
  return f + ':' + s
})

Vue.filter('handlerCountW', function (value) {
  if (value/10000>=1){
    return (value/10000).toFixed(1)+'w'
  }else {
    return value
  }
})

Vue.filter('handlerCount', function (value) {
  if (value/10000>=1){
    return (value/10000).toFixed(1)+'万'
  }else {
    return value
  }
})

// 高亮显示
Vue.filter('gaoLiang', function (value) {
  let input = value.input.split('')
  let text = value.text.split('')
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < text.length; j++) {
      if (input[i] === text[j]){
        text[j] = `<span style="color: #2CAF6F" class="green_g_l">${text[j]}</span>`
      }
    }
  }
   return text.join('')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
