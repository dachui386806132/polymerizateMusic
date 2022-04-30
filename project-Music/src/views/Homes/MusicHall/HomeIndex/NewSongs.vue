<template>
  <div class="new-songs-container">
    <MoveBox :title="'新歌首发'" :page=9 :type="2">
      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
          <div class="main_box" v-else>
            <div class="song_item" v-for="item in songs">
              <div class="song_img">
                <img v-lazy="item.picUrl" :key="item.picUrl" alt=""  @click="openSong(item.id)">
                <div class="play_btn" @click="listenSong(item.id)">
                  <i class="iconfont play_icon">&#xe615;</i>
                </div>
              </div>
              <div class="song_msg">
                <div>
                  <span @click="openSong(item.id)">{{ item.name }}</span>
                </div>
                <div>
                  <span  @click="openSinger(item.song.artists[0].id)">{{ item.song.artists[0].name }}</span>
                </div>
              </div>
              <div class="song_date">
                24:24
              </div>

            </div>
        </div>
      </template>
    </MoveBox>
  </div>
</template>

<script>
import {getHotSongList, getNewSongs} from "@/api";
import {mapMutations} from "vuex";
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";

export default {
  name:'NewSongs',
  components:{
    MoveBox
  },
  data(){
    return{
      songs:null,
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openSong','listenSong','openSinger']),
    // 获取主页需要的数据
    async getMsg(){
      this.loading = true
      let {data:res} = await getNewSongs(81)
      this.songs = res.result
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.new-songs-container{
  font-size: 14px;
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
    .main_box{
      width: 10800px;
      display: flex;
      flex-wrap: wrap;
      height: 300px;
      .song_item{
        width: 380px;
        height: 86px;
        margin-right: 20px;
        padding: 7px 0;
      }
      .song_img{
        width:86px;
        height: 86px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        display: inline-block;
        vertical-align:middle;
        &:hover{
          &>img{
            width: 92px;
            height: 92px;
            margin-left: -3px;
            margin-top: -3px;
          }
          &>.play_btn{
            opacity: 1;
            &>.play_icon{
              width: 40px;
              height: 40px;
              line-height: 40px;
              font-size: 20px;
              margin: 25px auto 0 auto;
            }
          }
        }
        &>img{
          width: 86px;
          height: 86px;
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
            width: 30px;
            height: 30px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:30px;
            border-radius: 100%;
            color: #545454;
            font-size: 16px;
            margin: 30px auto 0 auto;
          }
        }
      }
      .song_msg{
        display: inline-block;
        width:230px;
        margin-left: 10px;

        &>div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
          &>span{
            cursor: pointer;
            &:hover{
              color: #3bd389;
            }

          }
        }
      }
      .song_date{
        display: inline-block;
        color: #999999;
      }

    }
}
</style>
