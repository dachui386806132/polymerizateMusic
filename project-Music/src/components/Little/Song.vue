<template>
  <div class="song-container">
    <div v-loading="loading" v-if="loading" class="loading_box"></div>
    <div v-if="songMsg">
      <div class="msg_head" >
        <img :src="songMsg.al.picUrl" alt="" class="list_img" >
        <div class="msg_head_right">
          <div class="msg_head_msg">
            <div class="list_name">{{ songMsg.name }}</div>
            <div><i class="iconfont my_icon">&#xe60d;</i>{{ songMsg.ar[0].name }}</div>
            <div class="msg_line">
              <div>专辑：<span class="al_box">{{ songMsg.al.name }}</span></div>
              <div>唱片公司：{{ albumMsg.company }}</div>
            </div>
            <div class="msg_line">
              <div>类型：{{ albumMsg.subType }}</div>
              <div>标签：{{ albumMsg.tags | handlerNull }}</div>
            </div>
            <div class="msg_line">
              <div>发行时间：{{ albumMsg.publishTime | handlerPublishDay }}</div>
            </div>
          </div>
          <div class="msg_head_operate">
            <div @click="playSong([songMsg])" class="playAll"><i class="iconfont">&#xea8d;</i>播放歌曲</div>
          </div>
        </div>
      </div>
      <div class="comment_songWords">
        <div class="comment_box">
          <Comment :commentMsg="comment" :loading="isLoading" @sendCount="getCount"></Comment>
        </div>
        <div class="words_box">
          <div class="words_title">歌词</div>
          <div v-for="item in wordsArr" class="wordsItem">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAlbumDetail, getAlbumMsg, getSongComment, getSongListComment} from "@/api/searchApi";
import {mapGetters, mapMutations} from "vuex";
import {getMusicMsgApi, getMusicWordsApi} from "@/api/musicAPI";
import Comment from "@/components/Little/Comment";
export default {
  name:'Song',
  data(){
    return{
      songMsg:null,
      albumMsg:null,
      comment:null,
      commentCount:20,
      isLoading:false, // 加载评论
      wordsArr:null,
      loading:false
    }
  },
  created() {
    this.getSongMsg()
  },
  computed:{
    ...mapGetters(['showUserMsg']),
    // arrangeWords(){
    //   return  this.wordsArr.replace(/\[.*?\]/g, ',').split(',')
    // }
  },
  methods:{
    ...mapMutations(['playSong']),
    async getSongMsg(){
      this.loading =true
      let {data:res} = await getSongComment(this.$route.query.id,20)
      let {data:res2} = await getMusicMsgApi(this.$route.query.id)
      let {data:res3} = await getAlbumMsg(res2.songs[0].al.id)
      let {data:res4} = await getMusicWordsApi(this.$route.query.id)
      this.comment = res
      this.albumMsg = res3.album
      this.songMsg = res2.songs[0]
      this.wordsArr = res4.lrc.lyric.replace(/\[.*?\]/g, ',').split(',')
      this.loading = false
    },
    async getMoreComment(){
      console.log(this.$route.query.id)
      console.log(this.commentCount)
      let {data: res} = await getSongComment(this.$route.query.id, this.commentCount, this.commentCount)
      this.comment.comments.push(...res.comments)
      this.isLoading = false
      console.log(res.comments)
    },
    getCount(count){
      this.isLoading = true
      this.commentCount = count
      this.getMoreComment()
    }
  },
  components:{
    Comment
  }
}
</script>

<style lang="less" scoped>
.song-container{
  width: 1200px;
  margin:20px auto;
  .msg_head {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
  .msg_head_operate{
    margin-top: 40px;
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
}
.msg_line{
  width:500px;
  display: flex;
  &>div{
    width: 50%;
  }
}
.al_box{
  cursor: pointer;
  &:hover{
    color: #3bd389;
  }
}
.comment_songWords{
  width: 100%;
  display: flex;
  justify-content: space-between;
  .comment_box{
    width: 72%;
  }
  .words_box{
    width: 22%;
  .words_title{
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 10px;
  }
    .wordsItem{
      text-align: left;
      margin-bottom: 6px;
    }
  }
}
.loading_box{
  width: 1200px;
  margin: auto;
  height: 500px;
}
</style>
