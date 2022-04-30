<template>
  <div class="home-album-container">
    <div class="home_album_choice_box">
      <span class="choice_title" @click="area = 'ALL'">全部</span>
      <span @click="area = 'ZH'">华语</span>
      <span @click="area = 'EA'">欧美</span>
      <span @click="area = 'KR'">韩国</span>
      <span @click="area = 'JP'">日本</span>
    </div>
    <div v-loading="loading" v-if="loading" class="loading_box"></div>
    <div class="home_album_center_box" v-else ref="homeAlbumCenter">
      <div class="song_list_item" v-for="item in albums">
        <div class="song_list_img">
          <img v-lazy="item.blurPicUrl" :key="item.blurPicUrl" alt="">
          <div class="play_btn" @click="openAlbum(item.id)">
            <i class="iconfont play_icon" @click="playAlbumSongs({id:item.id,e:$event})">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div @click="openAlbum(item.id)"> <span class="hoverGreen">{{ item.name }}</span></div>
          <div @click="openSinger(item.artist.id)"> <span class="hoverGreen">{{ item.artist.name }}</span></div>
          <div>{{ item.publishTime | handlerPublishDayLine }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewAlbum} from "@/api";
import {getTypeSinger} from "@/api/searchApi";
import {mapActions, mapMutations} from "vuex";

export default {
  name:'HomeAlbum',
  data(){
    return{
      loading:false,
      albums:null,
      area:'',
      page:0,
      isAdd:false
    }
  },
  created() {
    this.searchNewAlbum('ALL',20)
  },
  mounted() {
    this.setBtn()
  },
  methods:{
    ...mapMutations(['openAlbum','openSinger']),
    ...mapActions(['playAlbumSongs']),
    async searchNewAlbum(area,limit){
      this.loading = true
      this.page = 1
      let {data:res} =await getNewAlbum(area,limit,this.page)
      this.albums = res.albums
      this.loading = false
    },
    async addNewAlbum(){
      let {data:res} =await getNewAlbum(this.area,5,(this.page-1)*5+30)
      this.albums.push(...res.albums)
      this.isAdd = false

    },
    // 设置按钮样式,和滚动加载功能
    setBtn(){
      let lines = document.querySelector('.home_album_choice_box').children
        for (let j = 0; j < lines.length; j++) {
          lines[j].addEventListener('click',()=>{
            for (let k = 0; k < lines.length; k++) {
              lines[k].removeAttribute('id')
            }
            lines[j].setAttribute('id','album_tag_select')
          })
          if (lines[j].className === 'choice_title'){
            lines[j].setAttribute('id','album_tag_select')
          }
        }

        window.addEventListener('scroll',()=>{
          let sTop = document.documentElement.scrollTop||document.body.scrollTop
          let center = this.$refs.homeAlbumCenter
          if (center.offsetTop){
            if (sTop+window.innerHeight>center.offsetTop+center.offsetHeight && !this.isAdd){
              this.isAdd = true
              this.page +=1
              this.addNewAlbum()
            }
          }

        })

      }
  },
  watch:{
    area(newVal){
      this.searchNewAlbum(newVal,20)
    }
  }
}
</script>

<style lang="less" scoped>
.home-album-container{
  width: 1200px;
  margin:auto;
  font-size: 14px;
  .home_album_choice_box{
    margin:20px auto 10px auto;
    #album_tag_select{
      background-color: #31c27c!important;
      color: #fff!important;
    }
    user-select: none;
    padding:20px 35px;
    &>span{
      margin-right: 20px;
    }
    span{
      padding: 2px 8px;
      height: 26px;
      display: inline-block;
      text-align: center;
      line-height: 26px;
      &:hover{
        color: #3bd389;
        cursor: pointer;
      }
    }
  }
  .home_album_center_box{
    display: flex;
    flex-wrap: wrap;
    .song_list_item{
      user-select: none;
      width: 224px;
      height: 283px;
      margin-right: 16px;
      margin-bottom: 50px;
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
          &:not(:nth-child(1)){
            color: #999;
          }
        }

      }
    }
  }

}
.loading_box{
  width: 1200px;
  margin: auto;
}
/deep/.el-loading-mask{
  background-color: #F4F4F4;
}
.hoverGreen{
  cursor: pointer;
  &:hover{
    color: #3bd389!important;
  }
}
</style>
