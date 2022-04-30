<template>
  <div class="wonderful-container">
    <MoveBox :title="'精彩推荐'" :page=4 :type="3">
      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
        <div class="main_box" v-else>
          <img v-lazy="item.imageUrl" :key="item.imageUrl" alt="" v-for="item in banners" class="item_img" @click="openSong(item.targetId)">
        </div>
      </template>
    </MoveBox>
  </div>
</template>

<script>
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";
import {getBanner} from "@/api";
import {mapMutations} from "vuex";

export default {
  name:'Wonderful',
  components:{
    MoveBox
  },
  data(){
    return{
      banners:null,
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openSong']),
    async getMsg(){
      this.loading = true
      let {data:res} = await getBanner()
      this.banners = res.banners
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.wonderful-container{
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
  .main_box{
    width: 4800px;
    height: 236px;
    .item_img{
      width: 580px;
      height: 236px;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
