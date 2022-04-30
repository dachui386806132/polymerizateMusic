<template>
  <div class="songs-type-container" v-if="$store.state.songMsg">
    <div class="btn_style_list"  >
      <i class="iconfont icon_btn" title="列表循环" v-if="playStyle===0" @click="handlerPlayStyle">&#xe66c;</i>
      <i class="iconfont icon_btn" title="单曲循环" v-else-if="playStyle===1" @click="handlerPlayStyle">&#xe66d;</i>
      <i class="iconfont icon_btn" title="随机播放" v-else-if="playStyle===2" @click="handlerPlayStyle">&#xe66b;</i>
    </div>
    <div class="btn_like">
<!--      添加到喜欢按钮-->
      <i class="iconfont icon_btn" v-if="isLike===false" @click="isLikeT">&#xe603;</i>
<!--      取消喜欢按钮-->
      <i class="iconfont icon_btn icon_like" v-else @click="isLikeF">&#xe895;</i>
    </div>

    <div class="btn_down" @click="downloadMusic">
      <i class="iconfont icon_btn">&#xe613;</i>
    </div>

    <div class="btn_comment">
      <i class="iconfont icon_btn" @click="openSong($store.state.songMsg.id)">&#xe8b9;</i>
      <span class="commentNum">{{ commitCount | handlerCountW }}</span>
    </div>

    <div class="btn_only">
      <div class="btn_only_box" @click="onlyWords=!onlyWords">
        <div class="only_txt"  v-if="!onlyWords">纯净 off</div>
        <div class="only_txt"  v-if="onlyWords">on 纯净</div>
      </div>
    </div>

    <!--音量-->
    <div class="player_voice">
      <i class="iconfont icon_btn" v-if="!isMute" @click="isMute=true">&#xe662;</i>
      <i class="iconfont icon_btn" v-else  @click="isMute=false">&#xe65e;</i>
      <div class="player_voice_btn">
        <div class="block">
          <el-slider v-model="volumeValue"  :show-tooltip="false" ref="myVoice"></el-slider>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { getIsListenLike, setAddLikeInsert,  setRemoveLike } from "@/api/listenSongsApi";
import {mapMutations} from "vuex";
import {getSongComment} from "@/api/searchApi";

export default {
  name:"SongsType",
  data(){
    return{

      // 播放方式状态
      playStyle:0,
      // 纯净模式状态
      onlyWords:false,
      // 音量初始值
      volumeValue:0,
      // 是否喜欢
      isLike:false,
      // 歌曲的
      songStatus:null,
      // 是否静音
      isMute:false,
      // 临时储存音量
      provisionalVolume:0,
      // 评论数量
      commitCount:0
    }
  },
  methods:{
    ...mapMutations(['changeIsLikeSongs','downloadSongs','changeCheckedListLike','changeOnlyWords','openSong']),
    // 切换播放方式按钮
    handlerPlayStyle(){
      this.playStyle ++
      if (this.playStyle>2){
        this.playStyle=0
      }
      // 将播放方式传给父组件
      this.$emit('playStyleStatus',this.playStyle)
    },
    //将音量保存在本地
    saveVolumeValue(){
      localStorage.setItem('volumeValue',this.volumeValue)
    },
    // 点击下载歌曲
    downloadMusic(){
      this.downloadSongs({
        url: this.$store.state.songUrl.url ,
        name:this.$store.state.songMsg.name,
        author:this.$store.state.songMsg.ar[0].name
      })
      this.downloadNews()
    },
    downloadNews() {
      this.$notify({
        title: '聚合物音乐提示',
        message: '正在下载音乐,请稍后...'
      });
    },
    async isLikeT(){
        let {data:res} = await setAddLikeInsert(this.$store.state.songMsg.id,this.$store.state.user.id)
        if (res.code>=200&&res.code<300){
          this.isLike = true
          this.sendIsLike( this.isLike)
          this.songStatus = {
            isHave:true
          }
        }
    },
   async isLikeF(){
     let {data:res} = await setRemoveLike(this.$store.state.songMsg.id,this.$store.state.user.id)
     if (res.code>=200&&res.code<300){
       this.isLike = false
       this.sendIsLike( this.isLike)
     }
    },

    // 将当前歌曲得喜欢状态传给vuex里的歌曲列表状态
    sendIsLike(val){
      this.changeCheckedListLike({
        id:this.$store.state.songMsg.id,
        like:val
      })
    },

    // get这个歌曲的喜欢状态
   async getListenLike(musicMsg){
      if (musicMsg){
        let {data:res} = await getIsListenLike(musicMsg.id,this.$store.state.user.id)
        if (res.data[0]){
          this.songStatus = {
            isHave:true
          }
        }else {
          this.songStatus = {
            isHave:false
          }
        }

        // 喜欢该歌曲
        if (res.data.length>=1&& res.data[0].status.data[0]===0){
          this.changeIsLikeSongs(true)
        }else{
          this.changeIsLikeSongs(false)
        }
      }

    },
    async getCom(){
      let {data:res} = await getSongComment(this.$store.state.songMsg.id)
      this.commitCount = res.total
    }
  },
  computed:{
    getMusicMsg(){
        return this.$store.state.songMsg
    },
    getIsLikeThis(){
      return this.$store.state.isLikeSongs
    },
  },
  watch:{
    volumeValue(newVal){
      if (newVal!==0){
        this.isMute = false
      }
      this.$emit('sendVolumeValue',newVal)
      this.saveVolumeValue()
    },
    getMusicMsg:{
      immediate:true,
      deep:true,
      handler(newVal){
        if (this.$store.state.user){
          this.getListenLike(newVal)
          this.getCom()
        }

      }
    },
    getIsLikeThis:{
      handler(newVal){
        this.isLike = newVal
      }
    },
    onlyWords:{
      immediate:true,
      handler(newVal){
        this.changeOnlyWords(newVal)
      }
    },
    isMute(newVal){
      if (newVal){
        this.provisionalVolume = this.volumeValue
        this.volumeValue= 0
      }else {
        this.volumeValue= this.provisionalVolume
      }
    }
  },
  created() {
    // 获取本地的音量信息
    this.volumeValue = parseInt(localStorage.getItem('volumeValue'))
  },
}
</script>

<style lang="less" scoped>
.hoverWhite{
  cursor: pointer;
  &:hover{
    color: white;
    border-color: white;
    >div{
      color: white;
    }
  }
}

.songs-type-container{
  user-select:none;
  color: hsla(0,0%,88.2%,.8);
  width: 460px;
  height: 100%;
  display: flex;
  line-height: 40px;
  padding-left: 30px;
  div{
    height: 100%;
    &:nth-child(-n+4){
      .icon_btn{
        height: 100%;
        width: 50px;
        display: block;
        text-align: center;
        font-size: 25px;
        .hoverWhite();
      }
    }
    .btn_only_box{
      margin-left: 10px;
      margin-top: 5px;
      width: 80px;
      height: 22px;
      border: 3px solid hsla(0,0%,88.2%,.8);
      color: hsla(0,0%,88.2%,.8);
      display: flex;
      border-radius: 20px;
      line-height: 22px;
      .hoverWhite();
      text-align: center;
      .only_txt{
        margin-left: 13px;
        font-family: 'Arial Black';
      }
    }


  }
  .player_voice{
    display: flex;
    .icon_btn{
      height: 100%;
      width: 30px;
      display: block;
      text-align: center;
      font-size: 25px;
      margin-left: 20px;
      .hoverWhite();
    }
    .player_voice_btn{
      width: 100px;
      margin-left: 10px;
    }
  }
}
.icon_like{
  color: #D15C5D;
  &:hover{
    color: #F06868!important;
  }
}
/deep/ .el-slider__runway{
  margin-top: 19px;
  height:2px;
  background-color: rgba(228, 231, 237, 0.5);
}
/deep/ .el-slider__button{
  border: none;
  width: 10px;
  height: 10px;
}
/deep/ .el-slider__bar{
  height: 2px;
  background-color: #DBD7D4;
}
/deep/ .el-slider__button-wrapper{
  top: -17px;
  left: 10px;
}
.btn_comment{
  .commentNum{
    width: 50px;
    display: block;
    text-align: center;
    color: rgba(228, 231, 237, 0.5);
    font-weight: 600;
    font-size: 8px;
    margin-top: -60px;
  }
}
</style>
