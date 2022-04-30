<template>
  <div class="new-charts-container">
      <MoveBox :title="'排行榜'" :page=1 :type="5">
      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
        <div class="main_box" v-else>
          <div class="top_list_item" v-for="(item,index) in topList">
            <div class="top_list_title">巅峰榜</div>
            <div class="top_list_name"> {{ topTitle[index].name }}</div>
            <div class="top_list_play">
              <div class="play_line">

              </div>
              <div class="play_btn" @click="playAll(item.tracks)">
                <i class="iconfont play_icon">&#xe615;</i>
              </div>
            </div>
            <div class="top_list_songs">
              <div class="top_list_song_item" v-for="(item,index) in songList[index]">
                <div class="song_name">
                  <span>{{ index+1 }}</span>
                  <span @click="openSong(item.id)">{{ item.name }}</span>
                </div>
                <div class="song_aut">
                  <span  @click="openSinger(item.ar[0].id)">{{ item.ar[0].name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </MoveBox>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";
import {getTopList, getTopListDetail} from "@/api";

export default {
  name:'NewCharts',
  components:{
    MoveBox
  },
  data(){
    return{
      topList:null,
      topTitle:null,
      songList:null,
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openSong','openSinger','playAll']),
    // 获取主页需要的数据
    async getMsg(){
      this.loading = true
      let {data:res} = await getTopListDetail()
      let topList = res.list.filter((item,index)=>index<=2)
      this.topTitle = topList
      let arr = []
      for (let i = 0; i < topList.length; i++) {
        let {data:songs} = await getTopList(topList[i].id)
        arr.push(songs.playlist)
      }
      this.topList = arr
      let songArr = []
      for (let i = 0; i < arr.length; i++) {
        let song = {}
        song = arr[i].tracks.filter((item,index)=>index<=2)
        songArr.push(song)
      }
      this.songList = songArr
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.setBackground()
        },10)
      })
      this.loading = false
    },
    // 设置背景
    setBackground(){
      let divs = document.querySelectorAll('.top_list_item')
      for (let i = 0; i < divs.length; i++) {
        divs[i].style.backgroundPositionX = - (i*224)+ 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.new-charts-container{
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .main_box{
    width: 880px;
    margin:0 auto 20px auto;
    display: flex;
    justify-content: space-between;
    .top_list_item{
      text-align: center;
      width: 224px;
      height: 500px;
      background-image: url("../../../../assets/img/bg_index_top.webp");
      background-size: 500% 100%;
      color: white;
      transition: all .4s ease;

      .top_list_title{
        margin-top: 30px;
        font-size: 20px;
        font-weight: 400;
        user-select: none;
      }
      .top_list_name{
        font-size: 26px;
        margin-top: 5px;
        cursor: pointer;
      }
      .top_list_play{
        position: relative;
        height: 40px;
        .play_line{
          left: 92px;
          top: 35px;
          position: absolute;
          width: 40px;
          height: 2.5px;
          background-color: white;
          margin: auto;
          opacity: 1;
          transition: all .1s ease;
        }
        .play_btn{
          width: 100%;
          transition: all .4s ease;
          opacity: 0;
          top: 0;
          position: absolute;
          .play_icon{
            cursor: pointer;
            transition: all .4s ease;
            width: 34px;
            height: 34px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:34px;
            border-radius: 100%;
            color: #545454;
            font-size: 20px;
            margin: 20px auto 0 auto;
          }
        }
      }

      &:hover{
        .play_line{
          opacity: 0;
        }
        .play_btn{
          opacity: 1;
          .play_icon{
            width: 48px;
            height: 48px;
            line-height: 46px;
            font-size: 25px;
            margin: 12px auto 0 auto;
          }
        }
      }
    }
  }


}
.top_list_song_item{
  margin-top: 30px;
  >div{
    font-size: 14px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 160px;
    margin-left: 34px;
    text-align: left;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .song_name{
    span{
      margin-right: 5px;
    }
  }
  .song_aut{
    margin-left: 52px;
  }
}



</style>
