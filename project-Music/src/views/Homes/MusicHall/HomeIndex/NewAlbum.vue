<template>
  <div class="new-album-container">
    <MoveBox :title="'新碟首发'" :page=3 :type="4" :pageType="areaType">

      <template v-slot:titleBtn>
        <div class="album_title_box">
          <span @click="changeColor('ALL',$event)" id="choice">全部</span>
          <span @click="changeColor('ZH',$event)">内地</span>
          <span @click="changeColor('EA',$event)">欧美</span>
          <span @click="changeColor('KR',$event)">韩国</span>
          <span @click="changeColor('JP',$event)">日本</span>
        </div>
      </template>

      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
        <div class="main_box" v-else>
          <div class="album_item" v-for="item in albums">
            <div class="album_img">
              <img v-lazy="item.blurPicUrl" :key="item.blurPicUrl" alt="">
              <div class="play_btn" @click="openAlbum(item.id)">
                <i class="iconfont play_icon" @click="playAlbumSongs({id:item.id,e:$event})">&#xe615;</i>
              </div>
            </div>
            <div class="album_msg">
              <div @click="openAlbum(item.id)">{{ item.name }}</div>
              <div><span v-for="item in item.artists">{{ item.name }}</span></div>
            </div>
          </div>
        </div>
      </template>

    </MoveBox>
  </div>
</template>

<script>
import {getHotSongList, getNewAlbum, getNewSongs} from "@/api";
import {mapActions, mapMutations} from "vuex";
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";

export default {
  name:'NewAlbum',
  components:{
    MoveBox
  },
  data(){
    return{
      albums:null,
      areaType:'ALL',
      loading:false
    }
  },
  created() {
    this.getMsg('ALL')
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openAlbum']),
    ...mapActions(['playAlbumSongs']),
    // 获取主页需要的数据
    async getMsg(area){
      this.loading = true
      this.areaType = area
      let {data:res} = await getNewAlbum(area)
      this.albums = res.albums
      this.loading = false
    },
    // 点击按钮改变颜色
    changeColor(area,e){
      let btns = document.querySelector('.album_title_box').children
      for (let i = 0; i < btns.length; i++) {
        btns[i].removeAttribute('id')
      }
      e.target.setAttribute('id','choice')
      this.getMsg(area)
    }
  }
}
</script>

<style lang="less" scoped>
.new-album-container{
  #choice{
    color: #3bd389;
  }
  .album_title_box{
    width: 500px;
    margin:0 auto 24px auto;
    span{
      display: inline-block;
      width: 100px;
      text-align: center;
      cursor: pointer;
      &:hover{
        color: #3bd389;
      }
    }
  }
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .main_box{
    width: 3600px;
    display: flex;
    flex-wrap: wrap;
    .album_item{
      user-select: none;
      width: 224px;
      height: 283px;
      margin-right: 16px;
      margin-bottom: 20px;
      .album_img{
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

      .album_msg{
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
</style>
