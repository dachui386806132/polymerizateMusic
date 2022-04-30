<template>
  <div class="song-words-container" v-if="songWords" ref="wordsBox">
    <div class="words_box"  ref="wordsMain"  @mousedown="handlerDown" >
      <div v-for="(item,index) in songWords" :class="indexNow === index+1 ? 'on' : ''" ref="wordsItem" >
        <div>{{ item.words }}</div>
        <div v-if="isShowTranslate">{{ item.translate }}</div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  props:['isTranslate'],
  name:'SongWords',
  data(){
    return{
      oldClientY:0,
      indexNow:0, // 现在显示的歌词下标
      isHandWords:false, // 判断用户是否正在拖动歌词
      isShowTranslate:true, //判断是否显示翻译
      times:1   // 倍数
    }
  },
  methods:{
    handlerDown(e){
      this.$refs.wordsMain.style.transition =  'transform 0s ease-out 0s'
      clearTimeout(this.isHandWordsTimer)
      this.isHandWords =true
      let wordsMain = this.$refs.wordsMain
      if (wordsMain.style.transform===''){
        wordsMain.style.transform='translateY(0px)'
      }
      this.oldClientY = e.clientY
      document.onmousemove = (e)=>{
        let now = parseFloat( wordsMain.style.transform.substr(11))
        if ((e.clientY - this.oldClientY)<0){
          wordsMain.style.transform =  `translateY(${now+(e.clientY - this.oldClientY)/2}px)`
        }else if((e.clientY - this.oldClientY)>0){
          wordsMain.style.transform =  `translateY(${now+(e.clientY - this.oldClientY)/2}px)`
        }

        this.oldClientY = e.clientY

        if (parseFloat( wordsMain.style.transform.substr(11))>=0){
          wordsMain.style.transform =  `translateY(0px)`
        }
        if (parseFloat( wordsMain.style.transform.substr(11))<-wordsMain.offsetHeight +70* this.times){
          wordsMain.style.transform =`translateY(${-wordsMain.offsetHeight +70* this.times}px)`
        }
        this.opacity()
      }
      document.onmouseup = () =>{
        if (this.$refs.wordsMain!==undefined){
          this.$refs.wordsMain.style.transition  =  'transform .3s ease-out 0s'
        }

        document.onmousemove=null
        this.isHandWordsTimer =  setTimeout(()=>{
          this.isHandWords =false
        },3000)

      }
    },

    opacity(){
      let list = this.$refs.wordsItem
      let height
      try {
        height = -parseFloat(document.querySelector('.words_box').style.transform.substr(11))
      }catch (e) {
      }
      if (!this.onlyWordsStatus){
        for(let i=0;i<list.length;i++) {
          let y = list[i].offsetTop +30 - height
          if (y >= -30 && y <= 175) {
            if (y <= 30) {
              list[i].style.opacity = (1 - ((30 - y) / 30)).toString()
            }
            if (y >= 100) {
              list[i].style.opacity = (1 - ((y - 100) / 55)).toString()
            }
            if (y > 30&&y<100){
              list[i].style.opacity = '1'
            }
          }
        }
      }else {
        for(let i= 0; i<list.length; i++) {
          let y = list[i].offsetTop +60 - height
          if (y >= -80 && y <= 440) {
            if (y <= 80) {
              list[i].style.opacity = (1 - ((80 - y) / 80)).toString()
            }
            if (y >= 280) {
              list[i].style.opacity = (1 - ((y - 280) / 150)).toString()
            }
            if (y > 80&&y< 280){
              list[i].style.opacity = '1'
            }
          }
        }
      }
    },
    // 更改窗口内容
    changeWordsLook(){
      if (this.$refs.wordsMain){
        this.$nextTick(()=>{
          let on = document.querySelector('.on')
          if (on!=null&&!this.isHandWords){
            if (this.indexNow<=2){
              document.querySelector('.words_box').style.transform = `translateY(0px)`
            }else {
              document.querySelector('.words_box').style.transform = `translateY(${-(on.offsetTop-42*this.times)}px)`
              }
          }
        })

      }
    }
  },
  mounted() {
    setInterval(this.opacity,1)
  },
  computed:{
    // 获取中文歌词的时间
    getWordsTime(){
      if (this.$store.state.songWords){
        let arr = []
        this.$store.state.songWords.words.split('[').filter((item,index)=>{
          if (index===0){
            arr.push(0)
          }else {
            arr.push(parseInt(item.substring(0,2))*60000 + parseInt(item.substring(3,5))*1000 + parseInt(item.substring(6,8))*10)
          }
        })
        return arr
      }
    },
    // 获取翻译歌词的时间
    getTranslateTime(){
      if (this.$store.state.songWords){
        let arr = []
        this.$store.state.songWords.translate.split('[').filter((item,index)=>{
          if (index===0){
            arr.push(0)
          }else {
            arr.push(parseInt(item.substring(0,2))*60000 + parseInt(item.substring(3,5))*1000 + parseInt(item.substring(6,8))*10)
          }
        })
        return arr
      }
    },
    // 返回计算出来的歌词和翻译
    songWords(){
     if (this.$store.state.songWords){
       let wordsT = this.getWordsTime
       let transT = this.getTranslateTime
       let j = 1
       let arr =[]
       let words = this.$store.state.songWords.words.replace(/\[.*?\]/g, ',').split(',')
       let translate = this.$store.state.songWords.translate.replace(/\[.*?\]/g, ',').split(',')
       if (transT.length===1){
         for (let i = 0; i < wordsT.length; i++) {
           arr.push({
             words:words[i],
             translate:''
           })
         }
       }else {
         for (let i = 0; i < wordsT.length; i++) {
           let translateTxt = ''
           for (let k = 0; k < transT.length; k++) {
             if (wordsT[i]===transT[k]){
               translateTxt = translate[k]
             }
           }
           arr.push({
             words:words[i],
             translate:translateTxt
           })
         }
       }
      return arr
     }
    },
    // 返回当前歌词移动的下标
    getWordsIndex() {
      return this.$store.state.wordsMoveIndex
    },
    // 获取纯净模式状态
    onlyWordsStatus(){
      return this.$store.state.onlyWords
    }

  },
  watch:{
    getWordsIndex:{
      immediate:true,
      handler(val){
        this.indexNow = val
        if (!this.isHandWords){
          this.changeWordsLook()
        }
      }
    },
    // 判断是否开启歌词翻译
    isTranslate:{
      immediate:true,
      handler(newVal){
        this.isShowTranslate = newVal
        localStorage.setItem('translate',newVal)
        this.changeWordsLook()
      }
    },
    onlyWordsStatus:{
      handler(newVal){
        let main = document.querySelector('.song-words-container')
        let son = document.querySelector('.words_box')
        if (newVal){
          this.times=2.5
          main.style.height = 400 +'px' //400px
          main.style.margin = '65px auto'
          main.style.color = 'white'
          son.style.fontSize = '25px'
          son.querySelector('div').style.marginBottom = '24px'
          this.$nextTick(()=>{
            this.changeWordsLook()
          })
        }else {
          this.times=1
          main.style.height = 160+'px' //160px
          main.style.margin = '40px 0 0 130px'
          main.style.color = 'hsla(0,0%,88.2%,.8)'
          son.style.fontSize = '14px'
          son.querySelector('div').style.marginBottom = '12px'
          this.$nextTick(()=>{
            this.changeWordsLook()
          })
        }
      }
    }
  },


}
</script>

<style lang="less" scoped>
.song-words-container{
  position: relative;
  text-align: center;
  overflow: hidden;
  color: hsla(0,0%,88.2%,.8);
  cursor: grab;
  user-select:none;
  height:160px;
  margin:40px 0 0 130px;
  .words_box{
    transition: transform 0.4s ease-out 0s;
    &>div{
      margin-bottom: 12px;
    }
  }
  .on{
    color: #31c27c;
  }

}
</style>
