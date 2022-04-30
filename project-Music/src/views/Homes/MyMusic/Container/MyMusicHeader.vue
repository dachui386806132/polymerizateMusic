<template>
  <div class="myMusicHeader-container">
    <div class="mod_profile">
      <img :src="showUserMsg.headImg" alt="" class="user_head_img">
      <div class="user_head_name">
        欢迎你  {{ showUserMsg.userStr }}
        <img :src="littleLogo" alt="" class="little_logo">
      </div>

      <div class="profile_nav_tab">
        <router-link to="/home/mymusic/mylike"  active-class="active">我喜欢</router-link>
        <router-link to="/home/mymusic/mycreate"  active-class="active">我创建的歌单</router-link>
        <router-link to="/home/mymusic/mymessage"  active-class="active">我的信息</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'MyMusicHeader',
  data(){
    return{
      userHead:'',
      littleLogo: require('@/assets/img/littleLogo.png')
    }
  },
  computed:{
    ...mapGetters(['showUserMsg'])
  },
}
</script>

<style lang="less" scoped>

  .myMusicHeader-container{
    padding-top: 65px;
    width: 100%;
    height: 315px;
    background: url("../../../../assets/img/bg_profile.bd497b5a.webp") 50% no-repeat;
    background-size: cover;
    .mod_profile{
      position: relative;
      height: 315px;
      width: 100%;
      .user_head_img{
        display: block;
        width: 102px;
        height: 102px;
        border: 4px solid #fff;
        border-radius: 99px;
        background: #fff;
        margin: auto;
      }
      .user_head_name{
        width: 900px;
        margin: 20px auto;
        font-size: 25px;
        color: white;
        text-align: center;
        .little_logo{
          width:16px;
          height:16px;
        }
      }

      .profile_nav_tab{
        width: 1200px;
        margin: 113px auto 0 auto;
        display: flex;
        .active{
          color: #31c27c;
        }
        >a{
          color: white;
          text-decoration: none;
          display: block;
          padding: 5px 38px 12px 0;
          &:hover{
            color: #31c27c;
          }
        }
      }
    }
  }
</style>
