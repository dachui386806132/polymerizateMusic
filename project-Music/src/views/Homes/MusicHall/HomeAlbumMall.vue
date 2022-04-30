<template>
  <div class="home-album-mall-container">
    <div>本站暂不售卖数字专辑,前往<span class="green" @click="$router.push('/home')">音乐馆</span>发现好音乐!</div>
  </div>
</template>

<script>
export default {
  name:'HomeAlbumMall',
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.home-album-mall-container{
  height: 400px;
  width: 1200px;
  margin: auto;
  text-align: center;
  line-height: 400px;
  .green{
    color: #3bd389;
    cursor: pointer;
    font-size: 30px;
  }
}
/deep/.el-loading-mask{
  background-color: #F4F4F4;
}
</style>
