<template>
  <div class="comment-container" v-if="commentMsg"  ref="allComment">
    <div class="comment_header"><span>评论</span><span>共{{ commentMsg.total }}条评论</span></div>
    <div class="hot_comment" v-if="commentMsg.hotComments.length">
      <div class="hot_comment_title">精彩评论</div>
      <div class="hot_comment_item" v-for="item in commentMsg.hotComments">
        <img :src="item.user.avatarUrl" alt="" class="user_head">
        <div class="user_name">{{ item.user.nickname }}</div>
        <div class="user_time">{{ item.time | handlerDay }}</div>
        <div class="user_comment">{{ item.content }}</div>
        <div :class="item.liked ? 'liked like' : 'liked'" @click="choiceLike(item)">
          <i class="iconfont likeFont">&#xec7f;</i>
          <span class="likedCount">{{ item.likedCount }}</span>
        </div>
        <div class="reply_box"  v-if="item.beReplied.length">
          <div class="reply_num" >共{{ item.beReplied.length }}条回复</div>
          <div class="reply">
            <span class="reply_name">{{ item.beReplied[0].user.nickname }}：</span>
            {{ item.beReplied[0].content }}
          </div>
        </div>

      </div>
    </div>
    <div class="all_comment"  v-if="commentAll.length">
      <div class="all_comment_title">全部评论</div>
      <div class="all_comment_item" v-for="item in commentAll">
        <img :src="item.user.avatarUrl" alt="" class="user_head">
        <div class="user_name">{{ item.user.nickname }}</div>
        <div class="user_time">{{ item.time | handlerDay }}</div>
        <div class="user_comment">{{ item.content }}</div>
        <div :class="item.liked ? 'liked like' : 'liked'" @click="choiceLike(item)">
          <i class="iconfont likeFont">&#xec7f;</i>
          <span class="likedCount">{{ item.likedCount }}</span>
        </div>
        <div class="reply_box"  v-if="item.beReplied.length">
          <div class="reply_num" >共{{ item.beReplied.length }}条回复</div>
          <div class="reply">
            <span class="reply_name">{{ item.beReplied[0].user.nickname }}：</span>
            {{ item.beReplied[0].content }}
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

export default {
  props:{
    commentMsg:{
      type:Object,
      default:null,
    },
    loading:{
      type:Boolean,
      default:false,
    }
  },
  name:'Comment',
  data(){
    return{
      count:20,
    }
  },
  methods:{
    load(){
      let offset = 5
      if (this.count+5>this.commentMsg.total){
        offset =this.commentMsg.total%5
      }
      this.count = this.count+offset
      this.$emit('sendCount',this.count)
    },
    choiceLike(item){
      item.liked = !item.liked
      if (item.liked){
        item.likedCount++
      }else {
        item.likedCount--
      }
    },
  },
  mounted() {
      window.addEventListener('scroll',()=>{
        if (this.$refs.allComment &&  this.count<this.commentMsg.total) {
          let bottom = this.$refs.allComment.offsetTop +  this.$refs.allComment.offsetHeight - window.screen.availHeight
          let y = document.documentElement.scrollTop||document.body.scrollTop
          if (y > bottom && !this.loading){
            this.load()
          }
        }
      })
  },
  computed:{
    commentAll(){
      if (this.commentMsg.comments.length>this.count){
        let arr = []
        this.commentMsg.comments.forEach((item,index)=>{
          if (index<=this.count-1){
            arr.push(item)
          }
        })
        return arr
      }else {
        return this.commentMsg.comments
      }
    }
  },
}
</script>

<style lang="less" scoped>
.comment-container{
  font-size: 14px;
  width:100%;
  .comment_header{

    &>span:nth-child(1){
      font-size: 20px;
      margin-right: 10px;
    }
    &>span:nth-child(2){
      color: #999999;
    }
  }
}
.hot_comment,.all_comment,.reply{
  margin-bottom: 20px;
  margin-top: 10px;
  .hot_comment_title,.all_comment_title{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #EDEDED;
    font-size: 16px;
  }
  &>.hot_comment_item:not(:last-child){
    border-bottom: 1px solid;
    border-color: #ededed;
  }
  &>.all_comment_item:not(:last-child){
    border-bottom: 1px solid;
    border-color: #ededed;
  }
  .hot_comment_item,.all_comment_item,.reply_item{
    position: relative;
    padding: 15px 0 15px 56px;
    zoom: 1;
    .user_head{
      display: block;
      border-radius: 999px;
      position: absolute;
      left: 0;
      top: 18px;
      width: 38px;
      height: 38px;
    }
    .user_name,.user_time{
      font-weight: 400;
      overflow: hidden;
      height: 26px;
      line-height: 26px;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #999999;
    }
    .user_time{
      margin-bottom: 10px;
      height: 20px;
      line-height: 20px;
    }
    .user_comment{
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 24px;
      text-align: justify;
    }

  }
}

.liked{
  display: inline-block;
  margin-top: 5px;
  color: #999999;
  cursor: pointer;
  &:hover{
    color: #3bd389;
  }
}
.like{
  color: #3bd389;
}
.likeFont{
  display: inline-block;
  font-size: 20px;
  margin-right: 2px;
}
.likedCount{
  font-size: 13px;
}
.reply{
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 5px;
  background-color:#F2F2F2;
  .reply_name{
    color: #31C27C;
  }
}
.reply_box{
  margin-top: 10px;
  .reply_num{
    color: #999999;
    cursor: pointer;
    &:hover{
      color: #3bd389;
    }
}
}
</style>
