<template>
  <div class="myMusic-container">
      <MyMusicMain v-if="user"></MyMusicMain>
      <MyMusicNulogin v-else></MyMusicNulogin>
  </div>
</template>

<script>
import MyMusicMain from "@/views/Homes/MyMusic/Container/MyMusicMain";
import MyMusicNulogin from "@/views/Homes/MyMusic/Container/MyMusicNulogin";
import {mapState} from 'vuex'
export default {
  name:'MyMusic',
  data(){
    return{

    }
  },
  components:{
    MyMusicMain,
    MyMusicNulogin
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
  .myMusic-container{
  }
</style>
