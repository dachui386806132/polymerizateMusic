<template>
  <div class="search-song-container">
    <div v-loading="loading" v-if="loading" class="loading_box">

    </div>
    <div class="search_box"  v-else-if="songList!==undefined">
      <div class="songs">
        <div class="singer_box" v-if="singer&& songList.songCount!==0">
          <img :src="singer.picUrl" alt="" class="singer_head_img" @click="openSinger(singer.id)">
          <div class="singer_msg_box" >
            <div  class="singer_msg" @click="openSinger(singer.id)">
              <span>{{ singer.name }}</span>
              <span v-if="singer.alia">别称：{{ singer.alia[0] | handlerNull }}  {{ singer.alia[1] | handlerNull }}</span>
              <span>专辑{{ singer.albumSize }}</span>
              <span>MV{{ singer.mvSize }}</span>
            </div>
            <div @click="playSingerSongs(singer.id)" class="playAll"><i class="iconfont">&#xea8d;</i>播放歌手全部歌曲</div>
          </div>

        </div>
        <div class="search_type">
          <span><router-link to="/home/search/song" active-class="active">单曲</router-link></span>
          <span><router-link to="/home/search/album" active-class="active">专辑</router-link></span>
          <span><router-link to="/home/search/mv" active-class="active">MV</router-link></span>
          <span><router-link to="/home/search/musiclist" active-class="active">歌单</router-link></span>
        </div>
        <div class="song_box">
          <SongNotFind v-if="songList.songCount===0" :myWidth="1200" :myHeight="300" :text="'没有找到相关歌曲'"></SongNotFind>
          <SearchSongList :songList="songList.songs" :page="page" v-else></SearchSongList>
        </div>
      </div>
      <div class="block goPage_btn">
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="songList.songCount"
            :current-page="page"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>

import {getSearch, getSingerSongsAll} from "@/api/searchApi";
import {mapMutations} from "vuex"
import SearchSongList from "@/views/Homes/Search/SearchSongList";
import SongNotFind from "@/components/Little/SongNotFind";
export default {
  name:'Search',
  data(){
    return{
      page:1, // 当前页数
      songList:[], // 当前搜索内容
      singer:null, // 当前歌手
      loading:true, // 是否在加载
      to:11
    }
  },
  methods:{
    ...mapMutations(['getSearch','openSinger','playAll']),
    async search(){
      this.loading = true
      let {data:res} = await getSearch(this.$store.state.mySearch,1,10,(this.page-1)*10)
      let {data:singer} = await getSearch(this.$store.state.mySearch,100,5,0)
      if (res.result){
        this.songList = res.result
        console.log(this.songList)
      }
      if (singer.result.artists){
        this.singer = singer.result.artists[0]
      }
      this.loading=false
    },
    handleCurrentChange(page){
      this.page = page
      this.search()
    },
    async playSingerSongs(id){
      let {data:res} = await getSingerSongsAll(id)
      await this.playAll(res.songs)
    }
  },
  computed:{
    getNowSearch(){
      return this.$store.state.mySearch
    }
  },
  watch:{
    getNowSearch:{
      immediate:true,
      handler(newVal,oldVal){
        if (newVal!==oldVal){
          this.loading=true
          this.search()
          this.page=1
        }
      }
    }
  },
  components:{
    SearchSongList,
    SongNotFind
  }
}
</script>

<style lang="less" scoped>
.search-song-container{
  font-size: 14px;
  margin: 20px auto;
}
.mod_search{
  background-image: url("http://localhost:3001/images/bg_search.webp");
  position: relative;
  height: 87px;
  padding: 80px 0;
  background-position: 50%;
  background-size: cover;
  color: white;
  .mod_search_hot{
    width: 70%;
    text-align: center;
    margin:auto;
    line-height: 30px;
    &>span{
      margin-left: 20px;
      cursor: pointer;
      opacity: .93;
      &:hover{
        opacity:1;
      }
    }
  }
}

.search_box{
  width: 1200px;
  margin:20px auto;
  .singer_box{
    .singer_head_img{
      border-radius: 100%;
      vertical-align: middle;
      width: 94px;
      height: 94px;
      border: 1px solid rgba(0,0,0,.15);
      border-color: #dedede\9;
      margin-right: 10px;
    }
    .singer_msg{
      display: block;
      cursor: pointer;

      span{
        margin-left: 12px;
        &:hover{
          color: #31C27C;
        }
      }
    }
  }

}

/deep/ .search_type{
  width: 1200px;
  margin:20px auto 0 auto;
  &>span{
    margin-right: 60px;
    cursor: pointer;
    &>a{
      color: black;
      text-decoration: none;
      &:hover{
        color: #31C27C;
      }
    }
  }
}
/deep/.active{
  color: #31C27C!important;
}
.goPage_btn{
  text-align: center;

}
.not_find{
  width: 100%;
  text-align: center;
  height: 500px;
  line-height:500px;
}
.singer_msg_box{
  display: inline-block;
  vertical-align:middle;
}
.playAll {
  background-color: #31c27c;
  color: white;
  border: none;
  > i {
    color: white;
    margin-right: 3px;
    font-size: 16px;
  }
  &:hover {
    background-color: #2CAF6F;
  }
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  margin-right: 6px;
  padding: 0 23px;
  height: 38px;
  line-height: 38px;
  display: inline-block;
  white-space: nowrap;
  box-sizing: border-box;
  overflow: hidden;
  margin-left: 12px;
  margin-top: 10px;
}
.song_box{
  margin-top: 20px;
}
.loading_box{
  width: 1300px;
  margin: auto;
  height: 320px;
}
/deep/.el-loading-mask{
  z-index: 998;
}
</style>
