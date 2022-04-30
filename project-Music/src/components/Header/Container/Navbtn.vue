<template>
  <div id="nav-btn-container">
    <!--    顶部导航路由按钮-->
    <ul class="mode_top_nav">
      <li class="top_nav_item"><router-link to="/home/musichall" active-class="active">音乐馆</router-link></li>
      <li class="top_nav_item"><router-link to="/home/mymusic" active-class="active">我的音乐</router-link></li>
      <li class="top_nav_item">
        <img :src="privilegeUrl" alt="客户端" class="privilegeUrlImg">
        <a @click="openOut('clientside')">客户端</a>
      </li>
      <li class="top_nav_item">
        <a @click="openOut('openness')">开放平台</a>
      </li>
      <li class="top_nav_item">
        <a @click="openOut('vip')">VIP</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Navbtn',
  data(){
    return{
      privilegeUrl:require('@/assets/img/mark_1.png')
    }
  },
  methods:{
    openOut(route){
      window.open('http://localhost:8080/'+route,'_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.top_nav_item{
  float: left;
  list-style: none;
  cursor: pointer;
  height: 90px;
  text-decoration: none;
  line-height: 90px;
  display: block;
  text-align: center;
  font-size: 18px;
  position: relative;
}

.active{
  background-color: #31c27c;
  color: white!important;
}
.mode_top_nav{
  margin-left: 210px;
  display: inline-block;
  overflow: hidden;
  width: 481px;
  .top_nav_item{
    .top_nav_item();
    a{
      color: black;
      display: block;
      padding: 0 20px;
      height: 100%;
    }
    &:hover a{
      color: #31C27C;
    }
    .privilegeUrlImg{
      position: absolute;
      top: 20px;
      right: 0;
      height: 14px;
    }
  }
  &:after{
    content:"";
    display:block;
    visibility:hidden;
    clear:both;
  }
}
</style>
