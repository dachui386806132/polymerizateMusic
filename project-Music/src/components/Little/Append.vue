<template>
  <div class="append-container">
    <ul>
      <li @click="appendListen()">播放列队</li>
      <li @click="appendLike()">我喜欢</li>
      <li v-for="item in mySongListArr" :key="item.id" @click="append(item.id)">{{ item.list_name }}</li>
    </ul>
  </div>
</template>

<script>
import {appendListSong, getListNum, getSongList, isListSong, setListImg} from "@/api/songListApi";
import {addListenApi, getIsListenLike, searchUserListenApi, setAddLikeInsert} from "@/api/listenSongsApi";
import {getMusicMsgApi} from "@/api/musicAPI";

export default {
  props:{
    songId:{
      type:Number,
      default:0
    },
  },
  name:'Append',
  data(){
    return{
      mySongListArr:[]
    }
  },
  methods:{
    // 获取歌单列表
     async getList(){
       let {data:res} = await getSongList(this.$store.state.user.id)
       this.mySongListArr = res.data.filter(item=>item.type.data[0]!==1)
     },
    // 给听歌列表添加歌曲
      async appendListen(){
        //判断是否有这首歌,没有的话就添加
        let {data:res} = await searchUserListenApi(this.songId)
        if (res.data.length===0) {
         let data =  await addListenApi(this.songId,this.$store.state.user.id)
          if (data.code>=200 && data.code<300){
            this.news('添加成功!')
          }
        }else if(res.data[0].status.data[0]===1){
          let data =  await addListenApi(this.songId,this.$store.state.user.id)
          if (data.code>=200 && data.code<300){
            this.news('添加成功!')
          }
        }else {
          this.news('添加成功!')
        }
    },
    // 给我的喜欢歌单添加歌曲
      async appendLike(){
        let {data:res} = await getIsListenLike(this.songId,this.$store.state.user.id)
        if (res.data.length===0) {
          let data = await setAddLikeInsert(this.songId,this.$store.state.user.id)
          if (data.code>=200 && data.code<300){
            this.news('添加成功!')
          }
        }else if(res.data[0].status.data[0]===1){
          let data =  await setAddLikeInsert(this.songId,this.$store.state.user.id)
          if (data.code>=200 && data.code<300){
            this.news('添加成功!')
          }
        }else {
          this.news('添加成功!')
        }
      },
    // 给歌单添加歌曲
    async append(listId){
     let length = await isListSong(listId,this.songId)
     let {data:songNum} = await getListNum(listId)
     let num =songNum.data[0].num
     if (length<=0){
      let {data:res} = await appendListSong(listId,this.songId)
       if (res.code>=200 && res.code<300){
         this.news('添加成功!')
         if (num<=0){
           let {data:res }=await getMusicMsgApi(this.songId)
           await setListImg(listId,res.songs[0].al.picUrl)
         }
       }
     }else {
       this.news('添加成功!')
     }
    },
    news(text) {
      this.$notify({
        title: '聚合物提示',
        message: text,
        type:'success'
      });
    },
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.hoverGreen{
  cursor: pointer;
  &:hover{
    color: white;
    background-color: #31C27C;
  }
}
.append-container::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
.append-container::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: #CCCCCC;
}
.append-container::-webkit-scrollbar-track{
  border-radius: 0;
  background-color: #F8F8F8;
}
.append-container{
  height: 260px;
  box-shadow: -1px -1px 29px -8px rgba(255,255,255,0.59);
  -webkit-box-shadow: -1px -1px 29px -8px rgba(255,255,255,0.59);
  -moz-box-shadow: -1px -1px 29px -8px rgba(255,255,255,0.59);
  color: black;
  right: -90px;
  top: 55px;
  position: absolute;
  width: 160px;
  padding: 5px 0 ;
  background-color: white;
  border: 1px solid #BFBFBF;
  z-index: 999;
  overflow: hidden;
  &:hover{
    overflow: auto;
  }
  ul{
    margin: 0;
    padding: 0;
    &>li:first-child{
      border-bottom: 1px solid #F0F0F0;
    }
    &>li{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      .hoverGreen();
      list-style: none;
      height: 45px;
      line-height: 45px;
      padding: 0 20px;
      text-align: left;
    }
  }
}
</style>
