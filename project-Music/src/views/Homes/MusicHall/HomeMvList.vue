<template>
  <div class="home-mv-list-container">
    <div class="home_album_choice_box">
      <span class="choice_title" @click="area = ''">全部</span>
      <span @click="area = '内地'">内地</span>
      <span @click="area = '港台'">港台</span>
      <span @click="area = '欧美'">欧美</span>
      <span @click="area = '日本'">日本</span>
      <span @click="area = '韩国'">韩国</span>
    </div>
    <div class="home_album_center_box" ref="homeAlbumCenter">
      <div v-loading="loading" v-if="loading" class="loading_box"></div>

      <div class="mv_item" v-else v-for="(item,index) in albums">
        <div class="song_list_img">
          <img :src="item.cover"  alt="">
          <div class="play_btn" @click="openMv(item.id)">
            <i class="iconfont play_icon" @click="openMv({id:item.id,e:$event})">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div @click="openMv(item.id)"> <span class="hoverGreen">{{ item.name }}</span></div>
          <div @click="openSinger(item.artist.id)">
            <span :class="'mvArtNames'+index" ></span>
          </div>
          <div>
            <i class="iconfont">&#xe61f;</i>
            <span>{{ item.playCount | handlerCount }}</span>
            <span>{{ item.mv.publishTime | handlerPublishDayLine }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getNewAlbum} from "@/api";
import {getMvList, getTypeSinger} from "@/api/searchApi";
import {mapActions, mapMutations} from "vuex";

export default {
  name:'HomeMvList',
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
    this.searchNewAlbum('',20)
  },
  mounted() {
    this.setBtn()
  },
  methods:{
    ...mapMutations(['openMv','openSinger']),
    ...mapActions(['playAlbumSongs']),
    async searchNewAlbum(area){
      this.loading = true
      this.page = 1
      let {data:res} =await getMvList(area,20,this.page)
      this.albums = res.data
      this.loading = false
      this.getArtName()
    },
    async addNewAlbum(){
      if ((this.page-1)*5+20<=45){
      let {data:res} =await getMvList(this.area,5,(this.page-1)*5+20)
      this.albums.push(...res.data)
      this.isAdd = false
      this.getArtName()
      }
    },
    // 设置按钮样式,和滚动加载功能
    setBtn(){
      let lines = document.querySelector('.home_album_choice_box').children
      for (let j = 0; j < lines.length; j++) {
        lines[j].addEventListener('click',()=>{
          for (let k = 0; k < lines.length; k++) {
            lines[k].removeAttribute('id')
          }
          lines[j].setAttribute('id','mv_tag_select')
        })
        if (lines[j].className === 'choice_title'){
          lines[j].setAttribute('id','mv_tag_select')
        }
      }

      window.addEventListener('scroll',()=>{
        let sTop = document.documentElement.scrollTop||document.body.scrollTop
        let center = this.$refs.homeAlbumCenter
        if (sTop+window.innerHeight>center.offsetTop+center.offsetHeight && !this.isAdd){
          this.isAdd = true
          this.page +=1
          this.addNewAlbum()
        }
      })
    },
    getArtName(){
      this.$nextTick(()=>{
        if (this.$route.path==='/home/musichall/mvlist'){
          for (let i = 0; i < this.albums.length; i++) {
            let item = document.querySelector(`.mvArtNames`+i)
            for (let j = 0; j < this.albums[i].artists.length; j++) {
              let span = document.createElement('span')
              span.className = 'hover_green'
              span.addEventListener('click',()=>this.openSinger(this.albums[i].artists[j].id))
              span.innerHTML = this.albums[i].artists[j].name
              item.appendChild(span)
              if (j!==this.albums[i].artists.length-1){
                let xg = document.createElement('span')
                xg.innerHTML = ' / '
                item.appendChild(xg)
              }
            }
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
.home-mv-list-container{
  width: 1200px;
  margin:auto;
  font-size: 14px;
  .home_album_choice_box{
    margin:20px auto 10px auto;
    #mv_tag_select{
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
    .mv_item{
      user-select: none;
      width: 285px;
      height: 223px;
      margin-bottom: 30px;
      margin-right:15px;
      .song_list_img{
        width:285px;
        height: 160px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        >img{
          transition:all .5s ease;
        }
        &:hover{
          &>img{
            width: 300px;
            height: 170px;
            margin-left: -8px;
            margin-top: -8px;
          }
          &>.play_btn{
            opacity: 1;
            &>.play_icon{
              width: 59px;
              height: 59px;
              line-height: 59px;
              font-size: 28px;
              margin: 48px auto 0 auto;
            }
          }
        }
        &>img{
          width:285px;
          height: 160px;
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
            width: 35px;
            height: 35px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:35px;
            border-radius: 100%;
            color: #545454;
            font-size: 20px;
            margin: 60px auto 0 auto;
          }
        }
      }

      .song_list_msg{
        font-size: 14px;
        margin-top: 10px;
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
          &:nth-child(3){
            color: #999;
            &>i{
              font-size: 15px!important;
              margin-right: 5px;
            }
            &>span{
              margin-right: 15px;
            }
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
