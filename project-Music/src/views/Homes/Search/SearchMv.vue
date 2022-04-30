<template>
  <div class="search-mv-container">
    <div v-loading="loading" v-if="loading" class="loading_box">
    </div>
    <SongNotFind  v-else-if="mvList.vmCount" :myWidth="1200" :myHeight="300" :text="'没有找到相关MV'"></SongNotFind>
    <div v-else class="mv_box">
      <div class="mv_item" v-for="item in mvList.mvs" :key="item.id" @click="openMv(item.id)">
        <div class="song_list_img">

          <img v-lazy="item.cover" :key="item.cover" alt="">
          <div class="play_btn">
            <i class="iconfont play_icon">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div>{{ item.name }}</div>
          <div>{{ item.artistName}}</div>
        </div>
      </div>

      <div class="block goPage_btn"  >
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :page-size="12"
            layout="prev, pager, next, jumper"
            :total="mvList ? mvList.mvCount : 0"
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
  name: 'SearchMv',
  data() {
    return {
      page:1,
      loading:false,
      mvList:null,
    }
  },
  methods: {
    ...mapMutations(['openMv']),
    async getMv(){
      this.loading = true
      let {data:res} = await getSearch(this.$store.state.mySearch,1004,12,this.page*12-12)
      this.mvList = res.result
      this.loading = false
    },

    handleCurrentChange(page){
      this.page = page
      this.getMv()
    }
  },
  computed:{
    getNowSearch(){
      return this.$store.state.mySearch
    }
  },
  created() {
    this.getMv()
  },
  watch:{
    getNowSearch:{
      immediate:true,
      handler(newVal,oldVal){
        if (newVal!==oldVal){
          this.loading=true
          this.getMv()
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
.search-mv-container{
  width: 1200px;
  margin: 20px auto;
  .mv_box{
    display: flex;
    flex-wrap: wrap;
  }
.mv_item{
  user-select: none;
  width: 285px;
  height: 243px;
  margin-bottom: 30px;
  margin-right:15px;
  .song_list_img{
    width:285px;
    height: 160px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover{
      &>img{
        width: 300px;
        height: 170px;
        margin-left: -8px;
        margin-top: -8px;
      }
      &>.play_btn{
        opacity: 1;
        &>.play_icon{
          width: 59px;
          height: 59px;
          line-height: 59px;
          font-size: 28px;
          margin: 48px auto 0 auto;
        }
      }
    }
    &>img{
      width:285px;
      height: 160px;
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
        width: 35px;
        height: 35px;
        display: block;
        background-color: #F2F2F2;
        text-align: center;
        line-height:35px;
        border-radius: 100%;
        color: #545454;
        font-size: 20px;
        margin: 60px auto 0 auto;
      }
    }
  }

  .song_list_msg{
    font-size: 14px;
    margin-top: 10px;
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
}}
.loading_box{
  width: 1300px;
  margin: auto;
  height: 300px;
}
/deep/.el-loading-mask{
  z-index: 998;
}

///deep/.el-pagination{
//  width: 280px;
//  margin: auto;
//}
</style>
