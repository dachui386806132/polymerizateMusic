<template>
  <div class="music-hall-container">
    <div class="router_nav">
        <router-link to="/home/musichall/index" active-class="active">首页</router-link>
        <router-link to="/home/musichall/singer" active-class="active">歌手</router-link>
        <router-link to="/home/musichall/album" active-class="active">新碟</router-link>
        <router-link to="/home/musichall/toplist" active-class="active">排行榜</router-link>
        <router-link to="/home/musichall/category" active-class="active">分类歌单</router-link>
        <router-link to="/home/musichall/radio" active-class="active">电台</router-link>
        <router-link to="/home/musichall/mvlist" active-class="active">MV</router-link>
        <router-link to="/home/musichall/albummall" active-class="active">数字专辑</router-link>
    </div>
    <div class="router_view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name:'MusicHall',
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
  .music-hall-container{

    .router_nav{
      width:763px;
      margin:12px auto;
      a{
        display: inline-block;
        color: black;
        text-decoration: none;
        padding: 0 27px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        &:hover{
          color: #31C27C!important;
        }
      }
      .search_type{
        width: 1200px;
        margin:20px auto 0 auto;
      }
      .active{
        color: #31C27C!important;
      }
    }
    .router_view{
      padding: 0px 0 30px 0;
      background-color: #F4F4F4!important;
    }
  }
</style>
