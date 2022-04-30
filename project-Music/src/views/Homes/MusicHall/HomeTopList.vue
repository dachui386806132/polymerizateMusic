<template>
  <div class="home-top-list-container">
    <div v-loading="loading" v-if="loading" class="loading_box"></div>
    <div v-else-if="topList">
      <div class="home_top_list_choice_box">
        <span  v-for="(item,index) in topList" :class="index === 0 ? 'choice_title':''" @click="qhBox(index)">{{ item.name }}</span>
      </div>
      <transition name="home_top_list" v-if="topList[index].tracks">
          <div v-for="(item,index) in topList" v-if="topNum === index" class="home_top_list_center_box">
          <div class="top_list_title"><span>歌曲</span><span>歌手</span><span>时长</span></div>
          <div class="top_list_item" v-for="(sItem,index) in topList[index].tracks" :key="sItem.id">
            <div>
              <span :class="index<3 ? 'item_index item_first': 'item_index' ">{{ index+1 }}</span>
              <img :src="sItem.al.picUrl" alt="" class="song-list-img" @click="openSong(sItem.id)">
              <span class="song-list-name" @click="openSong(sItem.id)">{{ sItem.name }}</span>
              <div class="operate_box">
                <i class="iconfont"  @click="listenSong(sItem.id)">&#xea6d;</i>
              </div>
            </div>
            <div>
              <span :class="'home_top_list_art_names'+index" ></span>
            </div>
            <div>{{ sItem.dt | handlerTime}}</div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import {getTopList, getTopListDetail} from "@/api";
import {mapMutations} from "vuex";

export default {
  name:'HomeTopList',
  data(){
    return{
      topList:null,
      topNum:0,
      loading:false
    }
  },
  created() {
  this.getMsg()
  },
  methods:{
    ...mapMutations(['openSong','listenSong','openSinger']),
    async getMsg(){
      this.loading = true
      let {data:res} =await getTopListDetail()
      let topArr = res.list.filter((item,index)=>index<3)
      let topList = []
      for (let i = 0; i < topArr.length; i++) {
        let {data:res2} =await getTopList(topArr[i].id)
        res2.playlist.tracks = res2.playlist.tracks.filter((item,index)=>index<20)

        topList.push(res2.playlist)
      }
      this.topList = topList
      this.loading = false
      this.setBtn()
      this.getArtName()
    },
    setBtn(){
      this.$nextTick(()=>{
        let lines = document.querySelector('.home_top_list_choice_box').children
        for (let j = 0; j < lines.length; j++) {
          lines[j].addEventListener('click',()=>{
            for (let k = 0; k < lines.length; k++) {
              lines[k].removeAttribute('id')
            }
            lines[j].setAttribute('id','top_list_tag_select')
          })
          if (lines[j].className === 'choice_title'){
            lines[j].setAttribute('id','top_list_tag_select')
          }
        }
      })
    },
    getArtName(){
      this.$nextTick(()=>{
        setTimeout(()=>{

          for (let i = 0; i < this.topList[this.topNum].tracks.length; i++) {
            let item = document.querySelector(`.home_top_list_art_names`+i)
            for (let j = 0; j < this.topList[this.topNum].tracks[i].ar.length; j++) {
              let span = document.createElement('span')
              span.className = 'hover_green'
              span.addEventListener('click',()=>this.openSinger(this.topList[this.topNum].tracks[i].ar[j].id))
              span.innerHTML = this.topList[this.topNum].tracks[i].ar[j].name
              item.appendChild(span)
              if (j!==this.topList[this.topNum].tracks[i].ar.length-1){
                let xg = document.createElement('span')
                xg.innerHTML = ' / '
                item.appendChild(xg)
              }
            }
          }

        },100)

      })
    },
    qhBox(index){
      this.topNum=999
      setTimeout(()=>{
        this.topNum=index
      },300)
    }
  },
  watch:{
    topNum(){
        this.getArtName()
    }
  }
}
</script>

<style lang="less" scoped>
.home-top-list-container{
  width: 1200px;
  margin:auto;
  font-size: 14px;
  .home_top_list_choice_box{
    margin:20px auto 10px auto;
    user-select: none;
    padding:20px 35px;
    #top_list_tag_select{
      background-color: #31c27c!important;
      color: #fff!important;
    }
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
  .home_top_list_center_box{
    width: 1200px;
    margin: auto;
  }
  .top_list_item{

    height:70px;
    line-height: 70px;
    display: flex;
    text-align: left;
    &:hover .operate_box{
      display: block;
    }
    //&:hover .song-list-name{
    //  width: 78%!important;
    //}
    &>div{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      &:nth-child(1){
        position: relative;
        width: 46%;
        display: flex;
        &>.song-list-img{
          width: 50px;
          height: 50px;
          margin-right: 10px;
          vertical-align:middle;
          cursor: pointer;
          margin-top: 10px;
        }
        &>.song-list-name{
          cursor: pointer;
          &:hover{
            color: #31C27C;
          }
        }
      }&:nth-child(2){
         width: 46%;
       }&:nth-child(3){
          display: flex;
          width: 8%;
          color: #999;
        }
    }
  }
}
.song-list-name{
  width: 85%;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  display: inline-block!important;
}
.item_first{
  color: #FF4222;
}
.item_index{
  font-size: 20px;
  width: 50px;
  text-align: center;
}
.hoverGreen{
  &:hover{
    color: #31c27c;
    cursor: pointer;
  }
}
.ifont{
  user-select: none;
  color: #A2A2A2;
  border: 1.5px solid  #A2A2A2;
  width: 30px;
  height:30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100%;
  margin-right: 12px;
  &:hover{
    .hoverGreen();
    border:  1.5px solid   #31c27c;
  }
}
.operate_box{
  position: absolute;
  right: 10px;
  top: 2px;
  z-index: 999;
  display: none;
  i{
    display: inline-block;
    .ifont();
  }
}
.home_top_list-enter,
.home_top_list-leave-to{
  opacity: 0;
}
.home_top_list-enter-active,
.home_top_list-leave-active{
  transition: all .3s ease;
}
.loading_box{
  width: 1200px;
  margin: auto;
  height: 300px;
}
/deep/.el-loading-mask{
  background-color: #F4F4F4;
}
.top_list_title{
  margin-bottom: 10px;
  &>span{
    display: inline-block;
  }
  &>span:nth-child(1){
    width: 41%;
    margin-left:5%;
  }
  &>span:nth-child(2){
    width: 46%;
  }
  &>span:nth-child(3){
    width: 8%;
  }
}
</style>
