<template>
  <div class="play-center-container">
    <Songs></Songs>
    <SongMsg></SongMsg>
  </div>
</template>

<script>
import Songs from "@/components/Play/Songs";
import SongMsg from "@/components/Play/SongMsg";

export default {
  name:'PlayCenter',
  data(){
    return{

    }
  },
  components:{
    Songs,
    SongMsg
  }

}
</script>

<style lang="less" scoped>
  .play-center-container{
    width: 1300px;
    justify-content: space-between;
    height: 530px;
    display: flex;
    margin:20px auto 0 auto;
  }
</style>
