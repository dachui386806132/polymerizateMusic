<template>
  <div class="music-lists-container">
    <div v-loading="loading" v-if="loading" class="loading_box">

    </div>
    <div v-else class="list_box">
      <div class="song_list_item" v-for="item in playlist">
        <div class="song_list_img">
          <img :src="item.coverImgUrl" alt="">
          <div class="play_btn" @click="openMusicList(item.id)">
            <i class="iconfont play_icon" @click="playSongListSongs({id:item.id,e:$event})">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div>{{ item.name }}</div>
          <div>{{ item.creator.nickname }}</div>
        </div>
      </div>
      <div class="block goPage_btn">
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="ids.length"
            :current-page="page"
        >
        </el-pagination>
      </div>
    </div>
    <div v-if="ids.length===0">
      <NotFind></NotFind>
    </div>
  </div>
</template>

<script>
import {getLikeSongList} from "@/api/likeApi";
import {getSongList} from "@/api/searchApi";
import {mapActions, mapMutations} from "vuex";
import NotFind from "@/components/Little/MyNotFind";

export default {
  name:'MusicLists',
  data(){
    return{
      playlist:null,
      page:1,
      ids:[],
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  methods:{
    ...mapMutations(['openMusicList']),
    ...mapActions(['playSongListSongs']),
    async getMsg(){
      this.loading = true
      let ids = await getLikeSongList(this.$store.state.user.id)
      this.playlist = []
      this.ids = ids
      for (let i = 0; i < ids.length; i++) {
        if (i>=this.page*10-10 && i<this.page*10){
          let {data:res} = await getSongList(ids[i])
          this.playlist.push(res.playlist)
        }
      }
      this.loading = false
      console.log(ids)
    },
    handleCurrentChange(page){
      this.page = page
      this.getMsg(page)
    }
  },
  components:{
    NotFind
  }
}
</script>

<style lang="less" scoped>
.music-lists-container{
  .list_box{
    display: flex;
    flex-wrap: wrap;
  }
  margin: 20px 0;

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

.goPage_btn{
  width: 100%;
  display: block;
  margin: auto;
}
.loading_box{
  height: 638px;
}
.green{
  color: #3bd389;
  cursor: pointer;
  font-size: 30px;
}
</style>
