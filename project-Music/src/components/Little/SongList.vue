<template>
  <div class="song-list-container">
    <div class="msg_head" v-if="playlist">
      <img :src="playlist.coverImgUrl" alt="" class="list_img" >
      <div class="msg_head_right">
        <div class="msg_head_msg">
          <div class="list_name">{{ playlist.name }}</div>
          <div>标签：<span v-for="item in playlist.tags" class="tags">{{ item }}</span></div>
          <div>播放量：{{ playlist.playCount | handlerCount }}</div>
          <div>歌曲数：{{ playlist.trackCount }}</div>
<!-- trackCount-->
          <div><i class="iconfont my_icon">&#xe60d;</i>{{ playlist.creator.nickname}}</div>
        </div>
        <div class="msg_head_operate">
          <div @click="playSongListSongs({id:playlist.id,e:$event})" class="playAll"><i class="iconfont">&#xea8d;</i>播放全部</div>
          <div class="operateList" @click="getLike">
            <i :class="isLike ? 'iconfont like' : 'iconfont'">{{ isLike ? '&#xe895;' : '&#xe603;' }}</i>收藏
          </div>
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
        <div v-loading="loading" v-if="loading" class="loading_box">
        </div>
        <ul class="songlist_list" v-else>
          <CreateSongItem v-for="(item,index) in songList" :key="item.id"
                          :id="item.id"
                          :name="item.name"
                          :albumName="item.al.name"
                          :albumId="item.al.id"
                          :authorName="item.ar[0].name"
                          :authorId="item.ar[0].id"
                          :time="item.dt"
                          :index="page*10-10+index"
          >
          </CreateSongItem>
        </ul>
      </div>
      <!--      歌单简介盒子-->

      <div v-if="playlist" ref="synopsis" class="synopsis_box">
        <div :class="isWatchSynopsis ? '' : ' longHidden'">
          简介：<div style="text-indent:2rem">{{ playlist.description }}</div>
        </div>
        <div v-if="synopsisHeight>=300" class="getMoreSynopsis">
          <span @click="isWatchSynopsis=true" v-if="!isWatchSynopsis">查看全部</span>
          <span @click="isWatchSynopsis=false" v-else>收起</span>
        </div>
      </div>
    </div>

    <div class="block goPage_btn">
      <el-pagination
          @current-change="handleCurrentChange"
          :hide-on-single-page="false"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="playlist.trackCount"
          :current-page="page"
          v-if="playlist"
      >
      </el-pagination>
    </div>
    <div class="comment_box">
      <Comment :commentMsg="comment" :loading="isLoading" @sendCount="getCount"></Comment>
    </div>
  </div>
</template>

<script>
import {searchList, searchListSong} from "@/api/songListApi";
import {getMusicMessageApi} from "@/api/musicAPI";
import CreateSongItem from "@/views/Homes/MyMusic/Container/MyCreate/CreateSongItem";
import Comment from "@/components/Little/Comment";
import {mapActions, mapMutations} from "vuex"
import {getSongList, getSongListComment} from "@/api/searchApi";
import {isAlbumLike, isSongListLike, likeAlbum, likeSongList, removeLikeAlbum, removeLikeSongList} from "@/api/likeApi";
export default {
  name:'SongList',
  data(){
    return{
      songId:[], // 歌单所有歌曲id
      playlist:null, // 歌单信息
      page:1, // 初始页
      songList:[], // 当前展示歌曲
      comment:null,
      commentCount:20,
      isLoading:false, // 加载评论
      loading:false, // 加载歌曲
      isLike:false,
      synopsisHeight:0,
      isWatchSynopsis:false
    }
  },
  created() {
    this.getMsg()
    this.getComment()
    this.getIsLike()
  },
  methods:{
    ...mapMutations(['playAll']),
    ...mapActions(['playSongListSongs']),
    // 获取歌单信息getSongList
    async getMsg(){
      this.loading =true
      let {data:res} = await getSongList(this.$route.query.id)
      this.playlist = res.playlist
      this.songId = res.playlist.trackIds
      this.loading =false
    },
    async getComment(){
      let {data:res} = await getSongListComment(this.$route.query.id,20)
      this.comment = res
    },
    async getMoreComment(){
        let {data: res} = await getSongListComment(this.$route.query.id, this.commentCount, this.commentCount)
        this.comment.comments.push(...res.comments)
        this.isLoading = false
    },
    handleCurrentChange(page){
      this.page = page
    },
    async getSong(page){
      let idArr = []
      this.songId.forEach((item,index)=>{
          if (index<=page*10-1 && index>=page*10-10){
            idArr.push(item.id)
          }
      })
      let {data:res} = await getMusicMessageApi(idArr)
      this.songList = res.songs
    },
    getCount(count){
      this.isLoading = true
      this.commentCount = count
      this.getMoreComment()
    },
    async getLike(){
      this.isLike=!this.isLike
      if (this.isLike){
        let data =  await likeSongList(this.$route.query.id,this.$store.state.user.id)
        console.log(data)
      }else {
        let data =  await removeLikeSongList(this.$route.query.id,this.$store.state.user.id)
        console.log(data)
      }
    },
    async getIsLike(){
      setTimeout(async ()=>{
        let num = await isSongListLike(this.$route.query.id,this.$store.state.user.id)
        if (num) this.isLike = true
      },0)

    }
  },
  watch:{
    page:{
      immediate:true,
      handler(newVal){
          this.getSong(newVal)
      }
    },
    songId:{
      deep:true,
      immediate:true,
      handler(newVal){
        this.getSong(this.page)
      }
    },
    playlist:{
      immediate:true,
      handler(newVal){
        if (newVal){
          this.$nextTick(()=>{
            this.synopsisHeight = this.$refs.synopsis.offsetHeight
          })
        }
      }
    },
  },
  components:{
    CreateSongItem,
    Comment
  },

}
</script>

<style lang="less" scoped>
.song-list-container {
  width: 1200px;
  margin: 40px auto 40px auto;

  .msg_head {
    font-size: 14px;
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
  margin-top: 63px;
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
    color:  #999999;
    > i {
      color: #999999;
      margin-right: 3px;
      font-size: 16px;
    }
    &:hover {
      background-color: #EDEDED;
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
.tags{
  margin-right: 5px;
}
.goPage_btn{
  width: 72%;
}
.loading_box{
  width: 100%;
  height: 570px;
}
.comment_box{
  width: 72%;
}
.like{
  color: red!important;
}
.longHidden{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 12;
  overflow: hidden;
}
</style>
