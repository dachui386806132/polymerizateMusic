<template>
  <div class="songs-msg-container" >
    <div class="song_img_box" >
      <img :src="$store.state.songMsg!==null? $store.state.songMsg.al.picUrl:'http://localhost:3001/images/player_cover.png'" alt="" class="albumImg" >
      <img src="http://localhost:3001/images/album_cover_player.png" alt="" class="albumImg_cover">
    </div>
    <div class="song_msg_box" v-if="$store.state.songMsg">
      <div>
        <span class="tit">歌曲名：</span>
        <span class="song_name" @click="openSong($store.state.songMsg.id)">{{ $store.state.songMsg.name }}</span>
      </div>
      <div>
        <span class="tit">歌手：</span>
        <span class="song_author" @click="openSinger($store.state.songMsg.ar[0].id)">{{ $store.state.songMsg.ar[0].name }}</span>
      </div>
      <div>
        <span class="tit">专辑：</span>
        <span class="song_album" @click="openAlbum($store.state.songMsg.al.id)">{{ $store.state.songMsg.al.name }}</span>
      </div>
    </div>
    <div  v-if="$store.state.songWords">
      <SongWords :isTranslate="isTranslate"></SongWords>
      <i class="iconfont translate_btnF" v-if="!isTranslate&&$store.state.songWords.translate!==''" @click="isTranslate=true">&#xe619;</i>
      <i class="iconfont translate_btnT" v-else-if="$store.state.songWords.translate!==''" @click="isTranslate=false">&#xe619;</i>
    </div>

  </div>
</template>

<script>
import SongWords from "@/components/Play/SongWords";
import {mapMutations} from 'vuex'
export default {
  name:"SongsMsg",
  data(){
    return{
      songMsg:null,
      isTranslate:false // 是否翻译
    }
  },
  components:{
    SongWords
  },
  mounted() {
    this.isTranslate = localStorage.getItem('translate') !== "false"
  },
  methods:{
    ...mapMutations(['openSong','openSinger','openAlbum'])
  }
}
</script>

<style lang="less" scoped>
img{
  user-select: none;
}
.translateBtn(@color){
  user-select:none;
  display: block;
  position: absolute;
  color: @color;
  bottom: 0;
  left: 272px;
  font-size: 26px;
  cursor: pointer;
  opacity: .6;
  &:hover{
    opacity: 1;
  }
}
.songs-msg-container{
  position: relative;
  width: 450px;
  height: 100%;
  .song_img_box{
    position: relative;
    padding: 0 60px 0 190px;
    .albumImg{
      width: 186px;
      height: 186px;
      user-select: none;
    }
    .albumImg_cover{
      position: absolute;
      width: 201px;
      height: 180px;
      right:50px;
      user-select: none;
    }
  }

  .song_msg_box{
    text-align: center;
    margin-left: 120px;
    &>div{
      font-size: 14px;
      margin-top: 8px;
      &>.tit{
        color: hsla(0,0%,88.2%,.8)
      }
      &>span:nth-child(2){
        cursor: pointer;
        color: hsla(0,0%,88.2%,.8);
        &:hover{
          color: white;
        }
      }
    }
  }
  .translate_btnF{
    .translateBtn(white);
  }
  .translate_btnT{
    .translateBtn(#3bd389);
  }
}
</style>
