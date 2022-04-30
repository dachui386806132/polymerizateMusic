<template>
  <div class="singer-container">
    <div v-loading="loading" v-if="loading" class="loading_box"></div>
    <div class="singer_main" v-if="!loading && singerMsg">
      <div class="singer_msg_box">
        <img :src="singerMsg.artist.cover" alt="" class="singer_head">
        <div class="singer_msg_right">
          <div class="singer_name">{{ singerMsg.artist.name }}</div>
          <div class="singer_briefDesc" @click="watchSinger=true" title="查看详情">{{ singerMsg.artist.briefDesc }}</div>
          <div class="singer_statistic">
            <span @click="jump(0)">单曲 <span class="big_num">{{ album.artist.musicSize }}</span></span>
            <span @click="jump(1)">专辑 <span class="big_num">{{album.artist.albumSize  }}</span></span>
            <span @click="jump(2)">MV <span class="big_num">{{ mv.mvs.length }}</span></span></div>
          <div @click="playSingerSongs(singerMsg.artist.id)" class="playAll"><i class="iconfont">&#xea8d;</i>播放歌手全部歌曲</div>
        </div>

      </div>

      <SingerHotSongs :songs="songs.hotSongs" class="d_jump"></SingerHotSongs>

      <SingerAlbum :album="album.hotAlbums" class="d_jump"></SingerAlbum>

      <SingerMv :mv="mv.mvs" class="d_jump"></SingerMv>

      <SingerSimilar :similar="similar.artists"></SingerSimilar>

      <el-dialog :visible.sync="watchSinger" width="540px" center>
        <div class="dialog_box">{{ singerMsg.artist.briefDesc }}</div>
      </el-dialog>
    </div>


  </div>
</template>

<script>
import {
  getSimiSinger,
  getSinger,
  getSingerAlbum,
  getSingerMv,
  getSingerSongs,
  getSingerSongsAll
} from "@/api/searchApi";
import SingerHotSongs from "@/components/Little/Singer/SingerHotSongs";
import SingerAlbum from "@/components/Little/Singer/SingerAlbum";
import SingerMv from "@/components/Little/Singer/SingerMv";
import SingerSimilar from "@/components/Little/Singer/SingerSimilar";
import {mapMutations} from "vuex";

export default {
  name:'Singer',
  data(){
    return{
      singerMsg:null,
      album:null,
      mv:null,
      songs:null,
      similar:null,
      watchSinger:false,
      loading:false
    }
  },
  methods:{
    ...mapMutations(['playAll']),
   async getMsg(){
     this.loading = true
      let {data:res} = await getSinger(this.$route.query.id)
      let {data:res2} = await getSingerAlbum(this.$route.query.id)
      let {data:res3} = await getSingerMv(this.$route.query.id)
      let {data:res4} = await getSingerSongs(this.$route.query.id)
      let {data:res5} =  await getSimiSinger(this.$route.query.id)
     console.log(res5.artists)
     this.singerMsg = res.data
     this.album = res2
     this.mv = res3
     this.songs = res4
     this.similar = res5
     this.loading = false
    },
    jump (index) {
      let jump = document.querySelectorAll('.d_jump')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop
      // Chrome
      document.body.scrollTop = total
      // Firefox
      document.documentElement.scrollTop = total
      // Safari
      window.pageYOffset = total
    },
    async playSingerSongs(id){
      let {data:res} = await getSingerSongsAll(id)
      await this.playAll(res.songs)
    }
  },
  created() {
    this.getMsg()
  },
  components:{
    SingerHotSongs,
    SingerAlbum,
    SingerMv,
    SingerSimilar
  }
}
</script>

<style lang="less" scoped>
.singer-container{
  background-color: #F4F4F4;
  width: 100%;
  font-size: 14px;
  padding: 20px 0;
  .singer_main{

    width: 1300px;
    margin: auto;
    &>div{
      width: 1300px;
      margin:0 auto 40px auto;
    }
    .singer_msg_box{
      display: flex;
      .singer_head{
        width: 250px;
        height: 250px;
        border-radius: 100%;
        margin-right: 30px;
      }
      .singer_msg_right{
        &>div{
          margin-bottom: 15px;
        }
        .singer_name{
          font-size: 38px;
          font-weight: 400;
        }
        .singer_briefDesc{
          width: 800px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover{
            color: #31C27C;
          }
        }
        .singer_statistic{
          font-size: 18px;

          &>span{
            margin-right: 20px;
            display: inline-block;
            //text-align: center;
          }
        }
      }
    }
  }

}
.big_num{
  font-size: 24px;
}

/deep/ .el-dialog__body{
  width: 500px;
  padding: 20px!important;
  margin: 0!important;
}
.dialog_box{
  width: 100%;
  line-height: 22px;
}
/deep/.item_title{
  font-size: 24px;
  width: 100%;
}
.loading_box{
  width: 1300px;
  margin:20px auto;
  height: 400px;

}
/deep/ .el-loading-mask{
  background-color: #F4F4F4;
}
.singer_statistic{
  span{
    cursor: pointer;
    &:hover{
      color: #31C27C;
    }
  }
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
  margin-top: 10px;
}
</style>
