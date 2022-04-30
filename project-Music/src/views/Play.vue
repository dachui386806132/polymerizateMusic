<template>
  <div class="play-container">
      <div class="bg_player_mask" ref="main"></div>
      <div class="bg_player_mask_son"></div>
    <div class="play_main">
      <div class="play_title_box">
        <div class="jhw_title" @click="$router.push('/home')">聚合物</div>
        <div class="user_head_info">
<!--          @click="$router.push('/home/mymusic')"-->
          <img :src="showUserMsg.headImg" alt="" class="user_head" v-if="$store.state.user">
          <div class="user_name" v-if="$store.state.user">{{ showUserMsg.userStr }}</div>
        </div>
      </div>
      <keep-alive>
        <PlayCenter v-if="!onlyWords"></PlayCenter>
      </keep-alive>
<!--      纯净模式盒子-->
      <div class="onlyWords_box" v-if="onlyWords">
        <SongWords></SongWords>
      </div>
      <SongBottom></SongBottom>
    </div>

  </div>
</template>

<script>

import {getMusicMessageApi, getMusicMsgApi, getMusicUrlApi, getMusicWordsApi} from "@/api/musicAPI";
import {addListenApi, searchUserListenApi} from "@/api/listenSongsApi";
import {userListenListApi} from "@/api/usersApi";

import PlayCenter from "@/components/Play/PlayCenter";
import SongBottom from "@/components/Play/PlayControl/SongBottom";
import SongWords from "@/components/Play/SongWords";

import {mapMutations,mapGetters,mapActions,mapState} from "vuex"

export default {
  data(){
    return{
      userInfo:null,
      onlyWords:false // 纯净模式状态
    }
  },
  computed:{
    ...mapState(['user']),
    ...mapGetters(['showUserMsg','showNowSongMsg']), // 拿到用户和歌曲的信息
    getUser(){
      return this.$store.state.user
    },
    getNowSongsMsg(){
      return this.$store.state.songMsg
    },
    // 获取纯净模式状态
    onlyWordsStatus(){
      return this.$store.state.onlyWords
    }
  },
  methods:{
    ...mapMutations(['changePlaySongs',
      'changeSongsWords',
      'setLogout',
      'changeDialogStatus',
      'setSongList',
      'changeSongUrlMsg']), // 调用改变当前音乐的方法
    ...mapActions(['getUserMsg']),
    //获取当前歌曲的信息
   async getSongMsg(songId){
     let {data:res} = await getMusicMsgApi(songId)
     this.changePlaySongs(res.songs[0])
     this.$refs.main.style.backgroundImage = `url(${this.showNowSongMsg.al.picUrl})`
    },

    // 获取当前歌曲的歌词
    async getWords(songId){
      let {data:words} = await getMusicWordsApi(songId)
      setTimeout(()=> {
        this.changeSongsWords({
          translate: words.tlyric===undefined ? '' : words.tlyric.lyric,
          words:words.lrc.lyric
        })
      },50)
    },

    setUserMsg(){
     this.userInfo = this.showUserMsg
    },

    // 点击返回主页面
    // backIndex(){
    //   this.$router.push('/home')
    // }
    login(){
      let num =this.$store.state.isOpenDialog
      this.changeDialogStatus(num++)
    },

    async addListen(songId){
      //判断是否有这首歌,没有的话就添加
      let {data:res} = await searchUserListenApi(songId)
      if (res.data.length===0) {
        await addListenApi(songId,this.showUserMsg.id)
      }

      let {data:res2} = await userListenListApi(this.showUserMsg.id)
      let arr = []
      res2.data.forEach(item=> arr.push(item.music_id))
      let {data} =  await getMusicMessageApi(arr)

      this.setSongList(data.songs)
      let {data:urlf} = await getMusicUrlApi(songId)
      this.changeSongUrlMsg(urlf.data[0])
    },
    async getFirstListen(){
      let {data:res} = await userListenListApi(1)
      console.log(res.data[0])
      return res.data[0].music_id
    }
  },
  components:{
    PlayCenter,
    SongBottom,
    SongWords
  },
  watch:{
    getUser:{
      immediate: true,
      handler(newVal){
        if (newVal){
          this.setUserMsg()
          if (this.$route.query.id!==undefined){
            this.addListen(this.$route.query.id)
            this.getSongMsg(this.$route.query.id)
            this.getWords(this.$route.query.id)
          }else {
            this.getFirstListen().then(id=>{
              console.log(id)
              this.addListen(id)
              this.getSongMsg(id)
              this.getWords(id)
            })
            this.$nextTick(()=>{

            })
          }
        }
      }
    },
    getNowSongsMsg:{
      handler(newVal){
        if (newVal){
          this.$refs.main.style.backgroundImage = `url(${this.showNowSongMsg.al.picUrl})`
        }
      }
    },
    onlyWordsStatus:{
      immediate: true,
      handler(newVal){
        this.onlyWords = newVal
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chaoChu{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.titleHover{
  opacity: .3;
  color: white;
  &:hover{
    opacity: 1;
  }
}
  .play-container{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .bg_player_mask{
      position: absolute;
      top: -5%;
      left: -5%;
      height: 110%;
      width: 110%;
      background-color: black;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: rgba(0,0,0,.5);
      filter:blur(50px);
      transition:all .5s linear;
    }
    .bg_player_mask_son{
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: black;
      background-color: rgba(0,0,0,.5);
    }

    .play_main{
      padding: 15px 50px 20px 20px;
      position: relative;
      height: 100%;
      .play_title_box{
        position: relative;
        display: flex;
        justify-content: space-between;

        .jhw_title{
          width: 80px;
          font-size: 25px;
          font-weight: 600;
          cursor: pointer;
          .titleHover();
        }

        .user_head_info{
          position: relative;
          display: flex;
          padding-right: 20px;
          .user_head{
            width: 35px;
            height: 35px;
            border-radius: 100%;
            vertical-align:middle;
            margin-right: 5px;
            cursor: pointer;
            display: block;
          }
          .user_name{
            cursor: pointer;
            width: 50px;
            height: 35px;
            line-height: 35px;
            margin-right: 5px;
            .chaoChu();
            .titleHover();
          }
          .logout{
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            .titleHover();
            position: absolute;
            top: 0;
            display: none;
            right: -5px;
          }
          &:hover .logout{
            display: block;
          }
        }
      }
    }

  }
  .login_btn{
    color: hsla(0, 0%, 88.2%, 0.8);
    cursor: pointer;
    &:hover{
      color: white;
    }
  }
  .onlyWords_box{
    overflow: hidden;
    width: 1300px;
    height: 530px;
    //background-color: rgba(243, 192, 202, 0.2);
    margin:20px auto 0 auto;
  }
</style>
