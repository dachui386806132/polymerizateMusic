<template>
  <div class="search-list-container">
    <div v-loading="loading" v-if="loading" class="loading_box">
    </div>
    <SongNotFind  v-else-if="albums.playlistCount===0" :myWidth="1200" :myHeight="300" :text="'没有找到相关歌单'"></SongNotFind>
    <div v-else>
      <div class="album_item_title">
        <span>专辑</span>
        <span>用户</span>
        <span>简介</span>
      </div>

      <div class="album_item" v-for="item in albums.playlists" :key="item.id">
        <div>
          <img :src="item.coverImgUrl" alt="" class="song-list-img" @click="openMusicList(item.id)">
          <span class="song-list-name"  @click="openMusicList(item.id)" >{{ item.name }}</span>
          <div class="operate_box">
            <i class="iconfont" @click="openMusicList(item.id)">&#xea6d;</i>
          </div>
        </div>
        <div>
          <span class="listenNum">{{ item.creator.nickname }}</span>
        </div>
        <div>{{ item.description | isNoting}}</div>
      </div>

      <div class="block goPage_btn">
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :page-size="8"
            layout="prev, pager, next, jumper"
            :total="albums.playlistCount"
            :current-page="page"
        >
        </el-pagination>
      </div>
    </div>


  </div>
</template>

<script>

import {getSearch} from "@/api/searchApi";
import {mapMutations} from "vuex";
import SongNotFind from "@/components/Little/SongNotFind";

export default {
  name:'SearchList',
  data(){
    return{
      page:1,
      albums:null,
      loading:false,
    }
  },
  methods:{
    ...mapMutations(['openMusicList']),
    async getAlbum(){
      this.loading = true
      let {data:res} = await getSearch(this.$store.state.mySearch,1000,8,this.page*8-8)
      this.albums = res.result
      this.loading = false
    },
    handleCurrentChange(page){
      this.page = page
      this.getAlbum()
    },

  },
  computed:{
    getNowSearch(){
      return this.$store.state.mySearch
    }
  },
  created() {
    this.getAlbum()
  },
  filters: {
    isNoting(value) {
      if (value === null){
        return '无'
      }else {
        return value
      }
    }
  },
  watch:{
    getNowSearch:{
      immediate:true,
      handler(newVal,oldVal){
        if (newVal!==oldVal){
          this.loading=true
          this.getAlbum()
          this.page=1
        }
      }
    }
  },
  components:{
    SongNotFind
  }
}
</script>

<style lang="less" scoped>
.search-list-container{
  width: 1200px;
  margin: 20px auto;
  font-size: 14px;
}
.album_item_title{
  height:70px;
  line-height: 70px;
  display: flex;
  text-align: left;
  &>span{
    display: block;
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
       width: 26%;
     }&:nth-child(3){
        display: flex;
        width: 28%;
      }
  }
}
.album_item{
  height:70px;
  line-height: 70px;
  display: flex;
  text-align: left;
  &:hover .operate_box{
    display: block;
  }
  &>div{
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
       width: 26%;
     }&:nth-child(3){
        width: 28%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
  }
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
.remove_list{
  display: none;
  margin-top: 8px;
  .ifont();
}
.goPage_btn{
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
}
.loading_box{
  width: 1300px;
  margin: auto;
  height: 300px;
}
/deep/.el-loading-mask{
  z-index: 998;
}
</style>



