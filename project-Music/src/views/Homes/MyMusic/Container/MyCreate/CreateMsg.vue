<template>
  <div class="create-msg-container">
    <div class="msg_head" v-if="$store.state.user">
      <img :src="listMsg.list_img" alt="" class="list_img">
      <div class="msg_head_right">
        <div class="msg_head_msg">
          <div class="list_name">{{ listMsg.list_name }}</div>
          <div><i class="iconfont my_icon">&#xe60d;</i>{{ $store.state.user.user_str}}</div>
        </div>
        <div class="msg_head_operate">
          <div @click="playAll(songList)" class="playAll"><i class="iconfont">&#xea8d;</i>播放全部</div>
        </div>
      </div>
    </div>
    <div class="msg_center">
<!--      歌曲列表盒子-->
      <div class="song_box">
        <ul class="songslist_header">
          <li class="songlist_header_name">歌曲</li>
          <li class="songlist__header_author">歌手</li>
          <li class="songlist__header_album">专辑</li>
          <li class="songlist__header_time">时长</li>
        </ul>
        <ul class="songlist_list" >
          <CreateSongItem v-for="(item,index) in songList" :key="item.id"
                    :id="item.id"
                    :name="item.name"
                    :albumName="item.al.name"
                    :albumId="item.al.id"
                    :authorName="item.ar[0].name"
                    :authorId="item.ar[0].id"
                    :time="item.dt"
                    :index="index"
          >
          </CreateSongItem>
        </ul>
      </div>
<!--      歌单简介盒子-->
      <div class="synopsis_box">
        简介：{{ listMsg.about }}
      </div>
    </div>
  </div>
</template>

<script>
import {searchList, searchListSong} from "@/api/songListApi";
import {getMusicMessageApi} from "@/api/musicAPI";
import CreateSongItem from "@/views/Homes/MyMusic/Container/MyCreate/CreateSongItem";
import {mapMutations} from "vuex"
export default {
  name:'CreateMsg',
  data(){
    return{
      listMsg:[],
      songList:[]
    }
  },
  created() {
    this.getMsg()
    this.getSong()
  },
  methods:{
    ...mapMutations(['playAll']),
    // 获取歌单信息
    async getMsg(){
     let {data:res} = await searchList(this.$route.query.id)
      console.log( res.data[0])
      this.listMsg = res.data[0]
    },
    // 查询所有歌曲
    async getSong(){
      let {data:res} = await searchListSong(this.$route.query.id)
      let songIdArr =[]
      for (let i = 0; i < res.data.length; i++) {
        songIdArr.push(res.data[i].music_id)
      }
      let {data:res2} = await getMusicMessageApi(songIdArr)
      this.songList = res2.songs
    },
  },
  components:{
    CreateSongItem
  }
}
</script>

<style lang="less" scoped>
.create-msg-container {
  width: 1200px;
  margin: 40px auto 40px auto;

  .msg_head {
    display: flex;
    justify-content: space-between;

    .list_img {
      width: 250px;
      height: 250px;
    }

    .msg_head_right {
      width: 900px;

      .msg_head_msg {
        .list_name {
          font-size: 24px;
          letter-spacing: 2px;
        }

        & > div {
          margin-top: 8px;
        }
      }

      .my_icon {
        font-size: 12px;
        color: #DDDDDD;
        margin-right: 5px;
      }
    }
  }
}
.msg_head_operate{
  margin-top: 120px;
  user-select: none;
  display: flex;
  .playAll {
    background-color: #31c27c;
    color: white;
    border: none;
    > i {
      color: white;
      margin-right: 3px;
      font-size: 16px;
    }
    &:hover {
      background-color: #2CAF6F;
    }
    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
  }
  .operateList{
    background-color: white;
    color: black;
    > i {
      color: #999999;
      margin-right: 3px;
      font-size: 16px;
    }
    &:hover {
      background-color: #EDEDED;
    }
    cursor: pointer;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #C9C9C9;
  }

}
.msg_center{
  width: 100%;
  margin-top: 40px;
  display: flex;
  .song_box{
    width: 72%;
  }
  .synopsis_box{
    font-size: 14px;
    width: 26%;
    padding: 1%;
  }
  .songslist_header{
    background-color: #F7F7F7;
    position: relative;
    padding-left: 46px;
    height: 50px;
    line-height: 50px;
    >li{
      list-style: none;
      float: left;
      &:nth-child(1){
        width: 48%;
      }
      &:nth-child(2){
        width: 23%;
      }
      &:nth-child(3){
        width: 23%;
      }
      &:nth-child(4){
        width: 6%;
      }
    }
  }
}
</style>
