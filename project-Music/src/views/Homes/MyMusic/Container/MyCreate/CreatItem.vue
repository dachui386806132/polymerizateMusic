<template>
  <div class="my-create-item-container">
      <div class="song_list_img">
        <img :src="list_img" alt="">
        <div class="play_btn" @click="openMsg">
          <i class="iconfont play_icon" @click="openListen">&#xe615;</i>
        </div>
      </div>
      <div class="song_list_msg">
        <div>{{ list_name }}</div>
        <div>{{ $store.state.user.user_str }}</div>
      </div>
  </div>
</template>

<script>
import {searchListSong} from "@/api/songListApi";
import {mapMutations} from "vuex"
export default {
  props:{
    id:{
      type:Number,
      default:0
    },
    list_img:{
      type:String,
      default:''
    },
    list_name:{
      type:String,
      default:''
    }
  },
  name:'CreateItem',
  data(){
    return{

    }
  },
  methods:{
    ...mapMutations(['playAll']),
    openMsg(){
      window.open('http://localhost:8080/home/listmsg?id='+this.id,'_blank')
    },
    async openListen(e){
      e.stopPropagation()
      let {data:res} = await searchListSong(this.id)
      let idArr = []
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].music_id)
        idArr.push({id: res.data[i].music_id})
      }
      await this.playAll(idArr)
    }
  }
}
</script>

<style lang="less" scoped>
.my-create-item-container{
  user-select: none;
  width: 224px;
  height: 283px;
  margin-right: 16px;
  margin-bottom: 20px;
  .song_list_img{
    width: 224px;
    height: 224px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover{
      &>img{
        width: 240px;
        height: 240px;
        margin-left: -8px;
        margin-top: -8px;
      }
      &>.play_btn{
        opacity: 1;
        &>.play_icon{
          width: 66px;
          height: 66px;
          line-height: 66px;
          font-size: 30px;
          margin: 79px auto 0 auto;
        }
      }
    }
    &>img{
      width: 224px;
      height: 224px;
      transition: all .5s ease;
    }

    .play_btn{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all .5s ease;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.15);
      .play_icon{
        transition: all .5s ease;
        width: 40px;
        height: 40px;
        display: block;
        background-color: #F2F2F2;
        text-align: center;
        line-height:40px;
        border-radius: 100%;
        color: #545454;
        font-size: 20px;
        margin: 92px auto 0 auto;
      }
    }
  }

  .song_list_msg{
    font-size: 14px;
    margin-top: 15px;
    &>div{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 22px;
      font-size: 14px;
      &:nth-child(1){
        cursor: pointer;
        &:hover{
          color: #31C27C;
        }
      }
      &:nth-child(2){
        color: #999;
      }
    }

  }
}
</style>
