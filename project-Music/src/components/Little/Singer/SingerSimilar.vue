<template>
  <div class="singer-similar-container">
    <div class="singer_similar_title">
      <span class="item_title">相似歌手</span>
    </div>
    <div v-if="!mySimilar" class="not_find">没有找到内容</div>
    <div class="similar_main_box">
      <div class="similar_singer_item" v-for="item in mySimilar">
        <img v-lazy="item.img1v1Url" :key="item.img1v1Url" alt="" class="singer_img" @click="openSinger(item.id)">
        <span class="singer_name"  @click="openSinger(item.id)">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  props:['similar'],
  name:'SingerSimilar',
  data(){
    return{
      mySimilar:null
    }
  },
  methods:{
    ...mapMutations(['openSinger']),
    getSimilar(){
      this.mySimilar = this.similar.filter((item,index)=>index<5)
    }
  },
  created() {
    this.getSimilar()
  }
}
</script>

<style lang="less" scoped>
.singer-similar-container{
  .similar_main_box{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .similar_singer_item{
      width: 224px;
      height: 245px;
      text-align: center;
      .singer_img{
        display: block;
        width: 140px;
        height: 140px;
        margin: auto;
        border-radius: 100%;
        cursor: pointer;
      }
      .singer_name{
        display: inline-block;
        margin-top: 15px;
        cursor: pointer;
        &:hover{
          color: #3bd389;
        }
      }
    }
  }
}
</style>
