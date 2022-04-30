<template>
  <div class="song-bottom-container">
    <div class="play_btn_box">
      <i class="iconfont btn_prev" @click="changePrev">&#xe604;<span class="icon_text">上一首</span></i>
      <i class="iconfont btn_play" v-if="isStop===false" @click="stopAndPlay(!isStop)">&#xe616;<span class="icon_text">暂停</span></i>
      <i class="iconfont btn_play" v-else  @click="stopAndPlay(!isStop)">&#xe615;<span class="icon_text">播放</span></i>
      <i class="iconfont btn_next" @click="changeNext">&#xe602;<span class="icon_text">下一首</span></i>
    </div>
    <SongProgress :playTime="this.playTime" @changeProgressWidth="handlerMouse" @stopInterval="getIntervalStatus">
    </SongProgress>
    <SongType @playStyleStatus="getPlayStyle" @sendVolumeValue="getVolumeValue"></SongType>
    <audio src="" controls autoplay :hidden="true"  id="songAudio" ref="songAudio" @ended="overPlay" v-if="getSongMsg!==null"></audio>
<!--  调节音量  volume-->
  </div>
</template>

<script>
import SongProgress from "@/components/Play/PlayControl/SongProgress";
import SongType from "@/components/Play/PlayControl/SongType";
import {mapState, mapMutations} from "vuex"
export default {
  name:'SongBottom',
  data(){
    return{
        // 是否暂停
        isStop:false,
        // 音乐播放进度
        playTime:0,
        // 子组件传来的音乐播放方式
        playStyle:0,
        // 获取用户点击状态
        isClick:false,
        // 新的播放时间
        newValue:0,
        // 传值判断停掉进度条的定时器状态
        isStopProgress:true,
        // 歌曲跟新时间
        wordsMove:0,
        // 歌词滚动下标
        wordsIndex:0,
        // 歌曲当前音量
        songsVolume:0,
        // 阻断器,判断音乐是否在淡入淡出
        isFade:false
    }
  },

  components:{
    SongProgress,
    SongType
  },

  computed:{
    ...mapState(['playIndex','playLength']),
    // 返回最新的url数据
    getNewUrl(){
      return this.$store.state.songUrl
    },
    // 返回最新的播放歌曲下标
    getPlayIndex(){
      return this.$store.state.playIndex
    },
    // 计算歌词滚动时间
    wordsMoveArr(){
      if (this.$store.state.songWords){
        let arr2 = []
        this.$store.state.songWords.words.split('[').filter((item,index)=>{
          if (index===0){
            arr2.push(0)
          }else {
            arr2.push(parseInt(item.substring(0,2))*60000 + parseInt(item.substring(3,5))*1000 + parseInt(item.substring(6,8))*10)
          }
        })
        return arr2
      }
    },
    // 获取当前歌曲信息
    getSongMsg(){
      return this.$store.state.songMsg
    },
    // 返回当前歌曲数量
    getSongListLength() {
      if (this.$store.state.songList!==null){
        return this.$store.state.songList.length;
      }
    },
  },
  methods:{
    ...mapMutations(['changIsStop','changPlayIndex','changeWordsMoveIndex']),
    // 切换上一首
    changePrev(){
        let num = this.playIndex-1
        if (num<1){
          num = this.playLength
        }
        this.changPlayIndex(num)
    },
    // 切换下一首
    changeNext(){
      let num = this.playIndex+1
      if (num>this.playLength){
        num = 1
      }
      this.changPlayIndex(num)
    },
    // 音乐播放结束以后的函数
    overPlay(){
      if (this.playStyle===0){
        if (parseInt(this.$store.state.playIndex)+1>this.$store.state.playLength){
          this.changPlayIndex(1)
        }else {
          this.changPlayIndex(parseInt(this.$store.state.playIndex)+1)
        }

      }else if (this.playStyle===2){
        let randomN = Math.ceil(Math.random() * this.$store.state.playLength)
        this.changPlayIndex(randomN)
      }
    },
    // 接收子组件传来的播放方式数据
    getPlayStyle(val){
      this.playStyle = val
      this.$refs.songAudio.loop = this.playStyle === 1;
    },
    // 接收子组件传来的播放音量
    getVolumeValue(val){
      if (this.$refs.songAudio!==undefined){
        this.$refs.songAudio.volume = val/100
        this.songsVolume = val/100
      }
    },
    // 触发用户点击进度条
    handlerMouse(val){
      this.isClick = true
      this.newValue = val
    },
    // 传值判断是否需要停掉定时器
    getIntervalStatus(val){
      this.isStopProgress = val
    },
    // 控制音乐进度条移动
    setProgressMove(newVal){
      clearInterval(this.currentMoveTimeTimer)
      clearTimeout(this.currentMoveTimeTimer2)
      this.currentMoveTimeTimer2 = setTimeout(() => {
        if (newVal){
          this.$refs.songAudio.src = newVal.url
        }
       this.currentMoveTimeTimer =  setInterval(() =>{
          if (this.isStopProgress && this.$refs.songAudio!==undefined){
            if (this.isClick === false){
              this.playTime = this.$refs.songAudio.currentTime
            }else {
              this.$refs.songAudio.currentTime = this.newValue/100*(this.$store.state.songMsg.dt/1000)
              this.isClick = false
            }
          }
        },50)
      },500)
    },
    // 控制歌词切换
    setWordsChange(val){
        if (this.$refs.songAudio!==undefined){
          let currentTime = parseInt(val*1000)
          for (let i = 0;i < this.wordsMove.length; i++) {
            if (this.wordsMove[i] > currentTime){
              this.wordsIndex = i
              break;
            }
          }
        }
    },
    // 暂停声音淡出
    fadeout(volume){
      // volume/0.01*5毫秒后暂停
      setTimeout(()=>{
        this.$refs.songAudio.pause()
        this.changStop()
      },volume/0.01*5)
      // 音量淡出
      let songsVolumeTimer = setInterval(()=>{
        volume-=0.01
        if(volume<0){
          clearInterval(songsVolumeTimer)
          return
        }
        this.$refs.songAudio.volume = parseFloat(volume.toFixed(2))
      },5)
    },
    // 播放声音淡入
    fadein(volume){
      this.$refs.songAudio.volume = 0
      this.$refs.songAudio.play()
      let songsVolumeTimer = setInterval(()=>{
        this.$refs.songAudio.volume+=0.01
        if(this.$refs.songAudio.volume>=volume){
          clearInterval(songsVolumeTimer)
         this.changStop()
        }
      },10)
    },
    // 更改暂停状态
    changStop() {
      this.isFade = false
      this.changIsStop(this.isStop)// 将最新的暂停状态传入vuex
    },
    stopAndPlay(newVal){
      if (!this.isFade){
        this.isStop=!this.isStop
        let volume =  this.songsVolume
        if (this.$refs.songAudio){
          if (newVal === true && !this.isFade){
            this.isFade = true
            this.fadeout(volume)
          }else if (newVal === false && !this.isFade) {
            this.isFade = true
            this.fadein(volume)
          }
        }
      }
    },

  },
  watch:{
    // 监听是否暂停
    isStop:{
      handler(newVal){

      }
    },
    // 监听最新的音乐路径变化
    getNewUrl:{
      immediate:true,
      handler(newVal){
        this.setProgressMove(newVal)
        }
      },
    // 监听最新的音乐下标
    getPlayIndex:{
      immediate:true,
      handler(newVal){
        this.isStop = false
      }
    },
    // 监听计算的歌词滚动时间数组
    wordsMoveArr:{
      immediate:true,
      deep:true,
      handler(newVal){
        if (newVal!==undefined){
          this.wordsMove = newVal
        }
      }
    },
    // 监听歌词滚动下标
    wordsIndex:{
      immediate:true,
      handler(newVal){
        this.changeWordsMoveIndex(newVal)
      }
    },
    // 监听当前播放时间变化
    playTime:{
      immediate:true,
      handler(newVal){
        this.setWordsChange(newVal)
      }
    },
    // 如果歌曲数量为1，就让歌曲自动循环
    getSongListLength:{
      immediate:true,
      handler(newVal){
        if (this.$refs.songAudio !== undefined){
          this.$refs.songAudio.loop = newVal <= 1;
        }
      }
    },
    getSongMsg:{
      immediate:true,
      handler(newVal){
        if(newVal!==null){
          this.$nextTick(()=>{
            this.$refs.songAudio.volume = parseInt(localStorage.getItem('volumeValue'))/100
          })

        }
      }
    }
  },
  mounted() {
    // 绑定键盘事件,键盘空格键抬起切换播放和暂停状态
    document.onkeyup = (e) =>{
      let  el = e || event || window.event || arguments[0]
      if (el.keyCode===32&&!this.isFade){
        this.stopAndPlay(!this.isStop)
      }
     }

  },


}
</script>

<style lang="less" scoped>

.song-bottom-container{
  user-select:none;
  width: 1340px;
  height:40px;
  display: flex;
  margin:40px auto 0 auto;
  font-size: 14px;
  .icon_text{
    font: 0/0 a;
    color: hsla(0,0%,88.2%,.8);
    font-size: 0;
  }

  .play_btn_box {
    display: flex;
    width: 210px;
    height: 100%;
    line-height: 40px;
    & > i {
      //background-color: skyblue;
      display: block;
      width: 30px;
      height: 100%;
      color: hsla(0,0%,88.2%,.8);
      font-size: 26px;
      text-align: left;
      margin-right: 40px;
      cursor: pointer;
      &:hover{
        color: white;
      }
      &:nth-child(2){
        font-size: 38px;
      }
    }
  }
}
</style>
