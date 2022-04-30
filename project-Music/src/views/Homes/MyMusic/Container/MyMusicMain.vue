<template>
  <div class="myMusicMain-container">
    <MyMusicHeader></MyMusicHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import MyMusicHeader from "@/views/Homes/MyMusic/Container/MyMusicHeader";
export default {
  name:'MyMusicMain',
  data(){
    return{

    }
  },
  components:{
    MyMusicHeader,
  }
}
</script>

<style lang="less" scoped>
  .myMusicMain-container{
  }
</style>
