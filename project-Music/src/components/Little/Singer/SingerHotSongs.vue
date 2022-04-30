<template>
  <div class="singer-hot-songs-container">
    <div class="singer_song_box">
      <span class="item_title">热门歌曲</span>
      <!--      歌曲列表盒子-->
      <div class="song_box">
        <ul class="songslist_header">
          <li class="songlist_header_name">歌曲</li>
          <li class="songlist__header_author">歌手</li>
          <li class="songlist__header_album">专辑</li>
          <li class="songlist__header_time">时长</li>
        </ul>
        <ul class="songlist_list">
          <CreateSongItem v-for="(item,index) in nowSong" :key="item.id"
                          :id="item.id"
                          :name="item.name"
                          :albumName="item.al.name"
                          :albumId="item.al.id"
                          :authorName="item.ar[0].name"
                          :authorId="item.ar[0].id"
                          :time="item.dt"
                          :index="songPage*10-10+index"
          >
          </CreateSongItem>
        </ul>
      </div>
      <div class="block goPage_btn">
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="false"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="songs.length"
            :current-page="songPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CreateSongItem from "@/views/Homes/MyMusic/Container/MyCreate/CreateSongItem";
export default {
  props:['songs'],
  name:'SingerHotSongs',
  data(){
    return{
        songPage:1,
        nowSong:null
    }
  },
  methods:{
    handleCurrentChange(page){
      this.songPage = page
      let arr = []
      this.songs.forEach((item,index)=>{
        if (index>=page*10-10 && index<page*10){
          arr.push(item)
        }
      })
      this.nowSong = arr
    }
  },
  created() {
    this.handleCurrentChange(1)
  },
  components:{
    CreateSongItem
  }
}
</script>

<style lang="less" scoped>
.singer-hot-songs-container{
  .song_box{
    margin-top: 15px;
    width: 100%;
  }
  .synopsis_box{
    font-size: 14px;
    width: 26%;
    padding: 1%;
  }
  .songslist_header{
    background-color: #F7F7F7;
    position: relative;
    padding-left: 46px;
    height: 50px;
    line-height: 50px;
    >li{
      list-style: none;
      float: left;
      &:nth-child(1){
        width: 48%;
      }
      &:nth-child(2){
        width: 23%;
      }
      &:nth-child(3){
        width: 23%;
      }
      &:nth-child(4){
        width: 6%;
      }
    }
  }
}
/deep/.el-pagination{

  margin: auto;
  width: 380px;
}
.goPage_btn{
  width: 1300px;
  background-color: #FFFFFF;
}
</style>
