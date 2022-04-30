<template>
  <div class="mv-container"  v-if="mvMsg">
    <div v-loading="loading" v-if="loading" class="loading_box">
    </div>

    <div v-else>
      <div class="mv_center">
        <video :src="url" autoplay controls class="video_box"></video>
        <div class="mv_name_box">
          <span class="mv_name">{{ mvMsg.name }}</span>
          <span class="mv_aut">{{ mvMsg.artistName }}</span>
          <span class="playCount">播放量:{{ mvMsg.playCount | handlerCount }}</span>
        </div>
      </div>

      <div class="synopsis_box">
        <div class="synopsis_title">视频简介</div>
        <span>{{ mvMsg.desc }}</span> <span>发行时间：{{ mvMsg.publishTime }}</span>
      </div>

      <div class="comment_box">
        <Comment :commentMsg="comment" :loading="isLoading" @sendCount="getCount"></Comment>
      </div>
    </div>


  </div>
</template>

<script>

import {getMv, getMvComment, getMvMsg, getSongListComment} from "@/api/searchApi";
import Comment from "@/components/Little/Comment";

export default {
  name: 'Mv',
  data() {
    return {
      url:'',
      mvMsg:null,
      comment:null,
      isLoading:false,
      loading:false
    }
  },
  methods:{
    async getMv(){
      let {data:res} = await getMv(this.$route.query.id)
      this.url = res.data.url
    },
    async getMvMsg(){
      let {data:res} = await getMvMsg(this.$route.query.id)
      this.mvMsg = res.data
    },
    async MvComment(){
      let {data:res} = await getMvComment(this.$route.query.id,20)
      this.comment = res
    },
    async getMoreComment(){
      let {data:res} = await getMvComment(this.$route.query.id,5,this.commentCount)
      this.comment.comments.push(...res.comments)
      this.isLoading= false
    },
    getCount(count){
      this.isLoading = true
      this.commentCount = count
      this.getMoreComment()
    }
  },
  created() {
    this.getMv()
    this.getMvMsg()
    this.MvComment()
  },
  components:{
    Comment
  }
}
</script>

<style lang="less" scoped>
.mv-container {
  margin-bottom: 20px;
  .mv_center{
    height: 700px;
    width: 100%;
    background-color: #333333;

    padding-bottom: 50px;
    .video_box{
      height: 675px;
      width: 100%;
      margin: auto;
    }
    .mv_name_box{
      color: white;
      width: 1180px;
      height: 70px;
      line-height: 70px;
      padding: 0 10px;
      margin: auto;
      display: flex;
      .mv_name{
        font-size: 22px;
        display: block;
       margin-right: 40px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .mv_aut{
        margin-right: 20px;
        font-size: 22px;
        display: block;
      }
      .playCount{
        color: #999999;
        font-size: 14px;
      }
    }
  }

}
.synopsis_box{
  width: 1180px;
  margin:20px auto;
  .synopsis_title{
    font-size: 24px;
    font-weight: 400;
    line-height: 60px;
  }
}
.comment_box{
  width: 1180px;
  margin: auto;
}
.loading_box{
  width: 1180px;
  height: 400px;
  margin: auto;
}

</style>
