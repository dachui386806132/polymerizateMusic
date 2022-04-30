<template>
  <div id="logo-container">
    <!--    顶部logo -->
    <h1 class="jhwmusic_title">
      <a href="/">
        <img :src="logoUrl" alt="聚合物音乐" class="jhwmusic_logo">
      </a>
    </h1>
  </div>
</template>

<script>
export default {
  name:'Logo',
  data(){
    return{
      // 导入音乐播放器logo
      logoUrl:require('@/assets/img/logo.png')
    }
  },
}
</script>

<style lang="less" scoped>
.jhwmusic_title {
  position: absolute;
  top: 22px;

  .jhwmusic_logo {
    height: 46px;
  }
}
</style>
