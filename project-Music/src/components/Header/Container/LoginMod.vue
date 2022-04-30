<template>
  <div id="search-container">
    <!--    顶部导航登录-->
    <div class="mod_top_login">
      <div v-if="user" class="head_img_box">

        <img :src="showUserMsg.headImg" class="headImg" :title="headTitle" alt="" @click="$router.push('/home/mymusic')" >
        <div class="img_select">

          <div class="img_select_item">
            <img :src="showUserMsg.headImg" class="msg_headImg" :title="headTitle" alt="" >
            <span class="mgs_name">{{ showUserMsg.userStr }}</span>
          </div>

          <div class="img_select_item">
            <span @click="goMyMessage()">个人信息</span>
          </div>

          <div class="img_select_item">
            <span @click="setLogout">退出登录</span>
          </div>

        </div>
      </div>

      <div v-else @click="centerDialogVisible = true" class="login-btn">
        <a class="select__choose">登录</a>
      </div>

      <div>
        <a class="select__choose">开通VIP</a>
        <ul>
          <li @click="warning">开通绿钻豪华版</li>
          <li @click="warning">开通付费包</li>
        </ul>
      </div>
      <div>
        <a class="select__choose">充值</a>
        <ul>
          <li @click="warning">购买乐币</li>
          <li @click="warning">充值饭票</li>
        </ul>
      </div>
    </div>
<!--    登录模态框-->
    <el-dialog :visible.sync="centerDialogVisible" width="50%" center>
      <my-login  @closeDialog="closeDialog"></my-login>
    </el-dialog>
  </div>
</template>

<script>
import Login from "@/components/Header/Container/Dialog";
// 将state里的数据获取过来
import {mapGetters,mapState,mapMutations} from 'vuex'

export default {
  name:'LoginMod',
  data(){
    return{
      //模态框判断关闭数据
      centerDialogVisible: false,
      headImgUrl: '',
      headTitle :''
    }
  },
  methods:{
    ...mapMutations(['setLogout']),
    closeDialog(val){
      this.centerDialogVisible = false
    },
    goMyMessage(){
      if (this.$route.path!=='/home/mymusic/mymessage') this.$router.push('/home/mymusic/mymessage')
    },
    warning() {
      this.$notify({
        title: '聚合物提示',
        message: '此功能暂未开放',
        type: 'warning'
      });
    },
  },
  computed:{
    ...mapState(['user','isOpenDialog']),
    ...mapGetters(['showUserMsg']),
  },

  components:{
    'my-login':Login
  },
  watch:{
    isOpenDialog(newValue){
      this.centerDialogVisible=true
    }
  }

}
</script>

<style lang="less" scoped>
.icon(@color){
  content: '\25bc';
  position: absolute;
  font-size: 10px;
  right: 6px;
  top: 0;
  color: @color;
}
.hoverGreen{
  cursor: pointer;
  &:hover{
    color: #31c27c;
  }
}

.mod_top_login{
  width: 269px;
  height: 100%;
  display: flex;
  .select__choose{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  >div {
    &:not(:first-child) {
    height: 38px;
    line-height: 38px;
    margin-top: 24px;
    margin-left: 12px;
    cursor: pointer;
    border-radius: 3px;
    position: relative;

    &:hover > ul {
      display: block;
    }

    &:first-child:hover {
      color: #31c27c;
    }

    &:not(:first-child) {
      font-size: 13px;
      border: 1px solid #C9C9C9;

      &:hover {
        &:after {
          content: '\25b2';
          color: white;
        }
      }
    }

    &:first-child {
      margin-left: 25px;
    }

    &:nth-child(2) {
      background-color: #31c27c;
      width: 116px;
      color: white;

      &:after {
        .icon(white);
      }
    }

    &:nth-child(3) {
      background-color: white;
      width: 68px;

      &:after {
        .icon(black);
      }

      &:hover {
        background-color: #31c27c;
        color: white;
      }
    }

    ul {
      text-align: center;
      display: none;
      position: absolute;
      width: 100%;
      top: 38px;
      left: 0;
      color: black;
      border: 1px solid #C9C9C9;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      background: white;

      li {
        list-style: none;
        width: 100%;
        height: 38px;

        &:not(:last-child) {
          border-bottom: 1px solid #C9C9C9;
        }

        &:hover {
          background-color: #31c27c;
          color: white;
        }
      }
    }

  }
  }
  .head_img_box{
    z-index: 100;
    height: 67px;
    line-height: 38px;
    margin-top: 24px;
    margin-left: 12px;
    border-radius: 3px;
    position: relative;
    > img {
      cursor: pointer;
      width: 38px;
      height: 38px;
      border-radius: 100%;
    }
    &:hover{
      >.img_select{
        display: block;
      }
    }
    .img_select{
      z-index: 100;
      display: none;
      position: absolute;
      top: 66px;
      border: 1px solid #F2F2F2;
      width: 236px;
      padding: 15px 10px 10px 10px;
      background-color: white;
      &:hover{
          display: block;
      }
      .img_select_item{
        margin-bottom: 10px;
        .msg_headImg{
          width: 65px;
          height: 65px;
          border-radius: 100%;
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
        }
        .mgs_name{
          font-size: 16px;
          margin-left: 12px;
          .hoverGreen();
        }
        >span{
          .hoverGreen();
        }
      }
    }
  }

  .login-btn{
    height: 38px;
    line-height: 38px;
    margin-top: 24px;
    margin-left: 12px;
    cursor: pointer;
    border-radius: 3px;
    position: relative;
    &:hover{
      color: #31c27c;
    }
    >a{
      width: 38px;
      height: 38px;
      display: block;
    }
  }
}
/deep/ .el-dialog__header{
  padding: 0 !important;
}
/deep/ .el-dialog__body{
  padding: 0!important;
}
/deep/ .el-dialog__headerbtn{
  top: 8px!important;
  right: 12px!important;
}
</style>
