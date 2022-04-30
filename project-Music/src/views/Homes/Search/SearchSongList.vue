<template>
  <div class="music-list-container">
    <!--    歌曲操作按钮-->
    <div class="mod_songlist_toolbar">
      <div @click="myPlayAll"><i class="iconfont">&#xea8d;</i>播放全部</div>
      <!--      <div><i class="iconfont">&#xe64b;</i>添加到</div>-->
      <div @click="download"><i class="iconfont">&#xe613;</i>下载</div>
      <div @click="operateLot=!operateLot"><i class="iconfont">&#xe61d;</i>{{ operateLot ? '取消批量操作' : '批量操作' }}</div>
    </div>
    <!--   歌曲表单头部  -->
    <div class="mod_songlist">
      <ul class="songslist_header">
        <li class="songlist_header_name">歌曲</li>
        <li class="songlist__header_author">歌手</li>
        <li class="songlist__header_album">专辑</li>
        <li class="songlist__header_time">时长</li>
        <el-checkbox v-model="isCheckedAll" class="checkbox" v-if="operateLot"></el-checkbox>
      </ul>
      <ul class="songlist_list" >
        <div class="loding_div" v-loading="loading" v-if="loading"></div>
        <Songlist v-for="(item,index) in nowMusicList"
                  :itemIndex="page * 10 - 10 + index"
                  :songId="item.id"
                  :songName="item.name"
                  :songAlbumName="item.al.name"
                  :songAlbumId="item.al.id"
                  :songAuthorName="item.ar[0].name"
                  :songAuthorId="item.ar[0].id"
                  :time="item.dt"
                  v-else
                  :isOperateLot="operateLot"
                  :isCheckedAll="isCheckedAll"
        >
        </Songlist>
      </ul>
    </div>
  </div>
</template>

<script>
import Songlist from "@/views/Homes/MyMusic/Container/MyLike/Songlist";
import {userLikeNumApi, userLikeSongAll, userLikeSongApi} from '@/api/usersApi'
import {mapGetters, mapMutations} from 'vuex'
import {getMusicMessageApi, getMusicMsgApi, getMusicUrlApi} from "@/api/musicAPI";
import {addListenLot, removeListenLot} from "@/api/listenSongsApi";
export default {
  props:['songList','page'],
  name:'MusicList',
  data(){
    return{
      userLikeList:[],
      nowMusicList:[],
      musicNum:0,
      loading: true,
      operateLot:false,
      isCheckedAll:true
    }
  },
  components:{
    Songlist,
  },
  computed:{
    ...mapGetters(['showUserMsg','showChoiceLike']),
    getLikeList(){
      return this.$store.state.likeList
    }
  },

  methods:{
    ...mapMutations(['downloadSongs','changeLikeList','playAll']),
    // 播放所有歌曲按钮
    async myPlayAll(){
      console.log()
      let idArr= []
      this.nowMusicList.forEach(item=>{
        idArr.push({id:item.id})
      })
      await this.playAll(idArr)
    },
    async download() {
      if (this.showChoiceLike.length===0){
        this.scNotNull('请先选择要下载的歌曲哦')
      }else {
        this.downloadNews()

        for (let i = 0; i < this.showChoiceLike.length; i++) {
          let {data:urlRes} =await getMusicUrlApi(this.showChoiceLike[i])
          let {data:msgRes} =await getMusicMsgApi(this.showChoiceLike[i])
          this.downloadSongs({
            url:urlRes.data[0].url,
            name:msgRes.songs[0].name,
            author:msgRes.songs[0].ar[0].name
          })
        }
      }
    },
    // 下载提示
    downloadNews() {
      this.$notify({
        title: '聚合物音乐提示',
        message: '正在下载音乐,请稍后...'
      });
    },
    // 收藏不能为空的警告
    scNotNull(msg){
      this.$message({
        message: msg,
        duration:'1500'
      });
    },
  },
 updated() {
   console.log(this.songList)
 },
  watch:{
    songList:{
      immediate:true,
      handler(newVal){
        this.nowMusicList = newVal
        if (this.nowMusicList){
          this.loading=false
        }
      }
    },
    operateLot(newVal){
      this.isCheckedAll = newVal
    },
    getLikeList:{
      deep:true,
      handler(newVal){
        this.nowMusicList = newVal
      }
    }
  },
}
</script>

<style lang="less" scoped>
.music-list-container{
  user-select: none;
  margin-bottom: 50px;
  padding-top: 30px;
  width: 100%;
  .mod_songlist_toolbar{
    width: 100%;
    display: flex;
    >div{
      &:first-child{
        background-color: #31c27c;
        color: white;
        border: none;
        >i{
          color: white;
        }
        &:hover{
          background-color: #2CAF6F;
        }
      }
      cursor: pointer;
      border: 1px solid #c9c9c9;
      border-radius: 2px;
      font-size: 14px;
      margin-right: 6px;
      padding: 0 23px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
      white-space: nowrap;
      box-sizing: border-box;
      overflow: hidden;
      background-color: white;
      &:hover{
        background-color: #EDEDED;
      }

      >i{
        color: #A2A2A2;
        line-height: 38px;
        margin-right: 3px;
        font-size: 16px;

      }
    }
  }
  .mod_songlist{
    .songslist_header{
      background-color: #F7F7F7;
      margin-top: 10px;
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
}
.loding_div{
  height: 520px;
}
.goPage_btn{
  margin-top: 15px;
  text-align: center;
}
/deep/ .el-pager li.active{
  color: #31c27c;
}
/deep/ .el-pager>li{
  &:hover{
    color: #31c27c;
  }
}
.checkbox{
  position: absolute;
  top: 1px;
  left: 8px;
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #3bd389;
  &:hover{
    border-color: #3bd389;
  }
}
/deep/ .el-checkbox__inner{
  width: 17px;
  height: 17px;
  background-color: rgba(255, 255, 255, 0);
  &:hover{
    border-color: #3bd389;
  }
}
/deep/ .el-checkbox__input{
  line-height: 17px;
}
/deep/ .el-checkbox__inner::after{
  height: 8px;
  width: 4px;
  left: 5px;
  top: 2px;
  transition: border-color 0s,background-color 0s;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:#3bd389;
  &:hover{
    border-color: #3bd389;
    color: #3bd389;
  }
}
/deep/ .el-checkbox__inner::after{
  box-sizing: content-box;
  content: "";
  border: 1px solid  #3bd389;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 6px;
  position: absolute;
  top: 3px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transform-origin: center;
  font-weight: 600;
}
</style>
