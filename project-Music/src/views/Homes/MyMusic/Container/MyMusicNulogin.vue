<template>
  <div class="myMusicUnlogin-container">
      <div class="profile_unlogin_tit1">私人音乐空间,听我想听的歌</div>
      <div class="profile_unlogin_tit2">登录管理我的音乐,多终端同步</div>
      <div class="unlogin_btn" @click="login">立即登录</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name:'MyMusicUnlogin',
  data(){
    return{
      num:0
    }
  },
  methods:{
    ...mapMutations(['changeDialogStatus']),
    login(){
      this.num++
      this.changeDialogStatus(this.num)
    }
  },
}
</script>
<style lang="less" scoped>
.title(@marT,@sizeF){
  width: 800px;
  font-size: @sizeF;
  margin:@marT auto 30px auto;
  font-weight: 400;
}
.myMusicUnlogin-container{
  height: 500px;
  background: url("../../../../assets/img/bg_profile_unlogin.69aad5de.webp") 50% no-repeat;
  background-size: cover;
  padding-top: 100px;
  color: white;
  text-align: center;
  .profile_unlogin_tit1{
    .title(40px,60px)
  }
  .profile_unlogin_tit2{
    .title(30px,30px)
  }
  .unlogin_btn{
    width: 150px;
    border-radius: 3px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    background-color: #31c27c;
    margin: auto;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
