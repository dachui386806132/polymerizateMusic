<template>
     <li class="songs-item">
       <div>
         <el-checkbox v-model="isChecked"></el-checkbox>
       </div>
       <div>
          <!--播放动画-->
         <div class="playCartoon" v-if="$store.state.isStop===false&&isPlay"></div>
         <span :class="isPlay ? 'play':''" v-else>{{ index }}</span>
       </div>
       <div>
         <span class="songName hoverWhite">
           <span :class="isPlay ? 'play':''" @click="openSong(id)">{{ name }}</span>
         </span>
         <Append :songId="id" ref="appendBox" v-if="isOpenAppend"></Append>
         <div class="operate_box">
           <i class="iconfont" @click="choiceSongs">&#xea6d;</i>
           <i class="iconfont" @click="isOpenAppend=true"  ref="appendIcon">&#xe622;</i>
           <i class="iconfont" @click="download">&#xe61a;</i>
         </div>
       </div>
       <div>
         <span class="songAuthor hoverWhite" @click="openSinger(authorId)">
          <span :class="isPlay ? 'play':''">{{ authorName  }}</span>
         </span>
       </div>
       <div>
         <span class="songTime hoverWhite">{{ time | handlerTime }}</span>
         <i class="iconfont remove_song" @click="removeSongs">&#xe74b;</i>
       </div>
     </li>

</template>

<script>
import {mapMutations} from "vuex";
import {getMusicMessageApi, getMusicMsgApi, getMusicUrlApi, getMusicWordsApi} from "@/api/musicAPI";
import {getIsListenLike, removeListen} from "@/api/listenSongsApi";
import {userListenListApi} from "@/api/usersApi";
import Append from "@/components/Little/Append";
export default {
  props:{
    index:{
      type:Number,
      default:0
    },
    id:{
      type:Number,
      default:0
    },
    name:{
      type:String,
      default:''
    },
    authorId:{
      type:Number,
      default:0
    },
    authorName:{
      type:String,
      default:''
    },
    time:{
      type:Number,
      default:0
    },
    albumId:{
      type:Number,
      default:0
    },
    albumName:{
      type:String,
      default:''
    },
    albumUrl:{
      type:String,
      default:''
    },
    checkedAll:{
      type:Boolean,
      default:false
    }
  },
  name:"SongsItem",
  data(){
    return{
      isChecked:false,
      isPlay:false,
      isLikeThis:false,
      isOpenAppend:false
    }
  },
  components:{
    Append
  },
  computed:{
    getMusicMsg(){
      return this.$store.state.songMsg
    },
    getCheckedAll() {
      return this.checkedAll
    },

    // 根据id判断播放的哪首歌,然后高亮显示播放歌曲
    playStatus(){
      if (this.$store.state.songMsg){
        return this.id === this.$store.getters.showNowSongMsg.id
      }
    },

    getPlayIndex(){
      return this.$store.state.playIndex
    }
  },
  watch:{
    getCheckedAll:{
      handler(newVal){
        this.isChecked = newVal
      }
    },
    playStatus:{
      immediate:true,
      handler(newVal){
        this.isPlay = newVal
        if (newVal){
          this.changPlayIndex(this.index)
        }
      }
    },
    getPlayIndex:{
      handler(newVal){
       if (newVal===this.index){
          this.getNewSongsMsg()
       }
      }
    },
    isChecked(thisChecked){
      this.changeCheckedList({
        id:this.id,
        status:thisChecked
      })
    },

    getMusicMsg:{
      immediate:true,
      deep:true,
      handler(newVal){
        // this.getListenLike()
      }
    }
  },
  methods:{
    ...mapMutations(['changPlayIndex',
      'changPlayLength',
      'changePlaySongs',
      'changeSongsWords',
      'changeSongUrlMsg',
      'addCheckedList',
      'changeCheckedList',
      'setSongList',
      'downloadSongs',
      'openSong',
      'openSinger'
    ]),
    async getNewSongsMsg(){
     let {data:msg} = await getMusicMsgApi(this.id)
     let {data:words} = await getMusicWordsApi(this.id)
     let {data:url} = await getMusicUrlApi(this.id)
    setTimeout(()=>{
      this.changePlaySongs(msg.songs[0])
      setTimeout(()=>{
        this.changeSongsWords({
          translate: words.tlyric===undefined ? '' : words.tlyric.lyric,
          words:words.lrc.lyric
        })
      },50)

      this.changeSongUrlMsg(url.data[0])
    },0)
    },
    choiceSongs(){
      this.changPlayIndex(this.index)
    },
    // get这个歌曲的喜欢状态
    async getListenLike(){
      let {data:res} = await getIsListenLike(this.id,this.$store.state.user.id)
      if (res.data[0]===undefined){
        this.isLikeThis = false
      } else if(res.data[0].status.data[0]===0){
        this.isLikeThis = true
      }

      // 将状态存入vuex中
      this.addCheckedList({
        like:this.isLikeThis,
        index:this.index,
        id:this.id,
        status:this.isChecked
      })
    },
    // 从听歌列表清除,并且刷新列表
    async removeSongs(){
      await removeListen(this.id , this.$store.state.user.id)

      let {data:res} = await userListenListApi(this.$store.state.user.id)
      let arr = []
      res.data.forEach(item=> arr.push(item.music_id))
      let {data} =  await getMusicMessageApi(arr)
      this.setSongList(data.songs)
      // 判断是否点击的是正在播放的音乐
      if (this.id ===this.$store.state.songMsg.id){
        if (this.$store.state.playIndex===1){
          this.changPlayIndex(0)
          setTimeout(()=>{
            this.changPlayIndex(1)
          },0)
        }else {
            this.changPlayIndex(this.$store.state.playIndex-1)
        }
      }
    },

   async download(){
      let {data:urlRes} =await getMusicUrlApi(this.id)
      this.downloadSongs({
        url:urlRes.data[0].url,
        name:this.name,
        author:this.authorName
      })
      this.downloadNews()
    },

    downloadNews() {
      this.$notify({
        title: '聚合物音乐提示',
        message: '正在下载音乐,请稍后...'
      });
    },
  },
  created() {
    this.changPlayLength(this.index)

  },
  mounted() {
    this.getListenLike()
    document.addEventListener('click',(e)=>{
      if (e.target!==this.$refs.appendIcon){
        this.isOpenAppend = false
      }
    })
  }


}
</script>

<style lang="less" scoped>
.chaoChu{
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.iconfont{
  .hoverWhite();
  display: inline-block;
  font-size: 18px;
  width: 34px;
  height: 34px;
  border-radius: 100%;
  border: 1px solid hsla(0, 0%, 100%, 0.22);
  text-align: center;
  line-height: 34px;
  margin-right: 10px;
  cursor: pointer;
}
.hoverWhite{
  &:hover{
    color: white;
    border-color: white;
    cursor: pointer;
  }
}
.songs-item{
    font-size: 14px;
    width: 850px;
    height: 50px;
    display: flex;
    position: relative;
    line-height: 50px;
      &:hover {
        & > div:nth-child(3) {
          .songName {
            width: 280px;
          }
          .operate_box {
            display: block;
          }
        }
        & > div:nth-child(5) {
            .remove_song {
              display: block;
            }
            .hoverWhite{
              display: none;
            }
          }
      }
    &>div{
      &:nth-child(1){
        .chaoChu();
        width: 60px;
      } &:nth-child(2){
        .chaoChu();
        width: 30px;
        text-align: center;
        position: absolute;
        left: 25px  ;
      } &:nth-child(3){
        width: 460px;
        position: relative;
        display: flex;
        .songName{
          .chaoChu();
          display: inline-block;
        }
        &>.operate_box{
          .chaoChu();
          position: absolute;
          right: 10px;
          display: none;
          top: 3px;
          &>i{
            .iconfont();
          }
        }
      } &:nth-child(4){
        width: 240px;
      } &:nth-child(5){
        width: 90px;
        .remove_song{
          margin-top: 8px;
          .iconfont();
          display: none;
        }
      }
    }
  }
.play{
  color: white;
}
.playCartoon{
  margin: auto;
  width: 10px;
  height: 10px;
  margin-top: 20px;
  background-image: url("https://y.qq.com/mediastyle/yqq/img/wave.gif?max_age=2592000");
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid hsla(0,0%,88.2%,.8);
  &:hover{
    border-color: white;
  }
}
/deep/ .el-checkbox__inner{
  width: 17px;
  height: 17px;
  background-color: rgba(255, 255, 255, 0);
  &:hover{
    border-color: white;
  }
}
/deep/ .el-checkbox__input{
  line-height: 17px;
}
/deep/ .el-checkbox__inner::after{
    height: 8px;
    width: 4px;
    left: 5px;
    top: 2px;
  transition: border-color 0s,background-color 0s;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: hsla(0,0%,88.2%,.8);
  &:hover{
    border-color: white;
    color: white;
  }
}
</style>
