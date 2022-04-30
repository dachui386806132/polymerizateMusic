<template>
  <div class="singer-album-container">
    <div class="singer_album_title">
      <span class="item_title">专辑</span>
    </div>
    <div v-if="album.length===0" class="not_find">没有找到内容</div>
    <div class="album_box">
      <div class="album_item" v-for="item in nowAlbum">
        <div class="song_list_img">
          <img v-lazy="item.picUrl" :key="item.picUrl" alt="item.name">
          <div class="play_btn" @click="openAlbum(item.id)">
            <i class="iconfont play_icon" @click="openAlbum(item.id)">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div>{{ item.name }}</div>
          <div>{{ item.publishTime | handlerPublishDay }}</div>
        </div>
      </div>
    </div>
    <div class="getMore" v-if="album.length>5">
      <span class="getMore_btn" @click="isWatchMore=true;getSomeAlbum(album.length)" v-if="!isWatchMore">更多</span>
      <span class="getMore_btn" @click="isWatchMore=false;getSomeAlbum(5)" v-else>收起</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['album'],
  name:'SingerAlbum',
  data(){
    return{
      nowAlbum:null,
      isWatchMore:false
    }
  },
  methods:{
    openAlbum(id){
      window.open('http://localhost:8080/home/myalbum?id='+id,'_blank')
    },
    getSomeAlbum(max){

        let arr = []
        this.album.forEach((item,index)=>{
          if (index>=0 && index<max){
            arr.push(item)
          }
        })
        this.nowAlbum = arr
    }
  },
  created() {
    if (this.album.length>=5){
      this.getSomeAlbum(5)
    }else {
      this.getSomeAlbum(this.album.length)
    }
  }
}
</script>

<style lang="less" scoped>
.singer-album-container{
 .album_box{
   margin-top: 15px;
   display: flex;
   flex-wrap: wrap;
   .album_item{
     margin-right: 36px;
     width: 224px;
     height: 283px;
     margin-bottom: 20px;
     .song_list_img{
       user-select: none;
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
 }

}
.getMore_btn{
  cursor: pointer;

  &:hover{
    color: #31C27C;
  }
}
.getMore{
  text-align: right;
}
.not_find{
  text-align: center;
  height: 80px;
  line-height: 80px;
}
</style>
