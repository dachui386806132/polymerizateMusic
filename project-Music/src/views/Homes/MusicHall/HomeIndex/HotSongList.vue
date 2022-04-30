<template>
  <div class="hot-song-list-container">
    <MoveBox :title="'歌单推荐'" :page=6 :type="1">
      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
        <div class="main_box" v-else>
          <div class="song_list_item" v-for="item in hotSongList">
            <div class="song_list_img">
              <img v-lazy="item.picUrl" :key="item.picUrl" alt="">
              <div class="play_btn" @click="openMusicList(item.id)">
                <i class="iconfont play_icon" @click="playSongListSongs({id:item.id,e:$event})">&#xe615;</i>
              </div>
            </div>
            <div class="song_list_msg">
              <div @click="openMusicList(item.id)">{{ item.name }}</div>
              <div>播放量: {{ item.playCount | handlerCount }}</div>
            </div>
          </div>
        </div>
      </template>
    </MoveBox>
  </div>
</template>

<script>
import {getHotSongList} from "@/api";
import {mapActions, mapMutations} from "vuex";
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";

export default {
  name:'HotSongList',
  components:{
    MoveBox
  },
  data(){
    return{
      hotSongList:null,
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openMusicList']),
    ...mapActions(['playSongListSongs']),
    // 获取主页需要的数据
    async getMsg(){
      this.loading = true
      let {data:res} = await getHotSongList()
      this.hotSongList = res.result
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.hot-song-list-container{
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
  .main_box{
    display: flex;
    .song_list_item{
      user-select: none;
      width: 224px;
      height: 283px;
      margin-right: 16px;
      margin-bottom: 20px;
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
