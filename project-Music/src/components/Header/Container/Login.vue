<template>
  <div class="login-container">
    <div class="page_login_body">
      <div class="page_login_left">
        <h1 class="login_title">帐号密码登录</h1>
        <h3 class="login_title">输入时请注意密码安全，防止盗号。</h3>
        <el-input placeholder="请输入账号" v-model="username" @focus="getFocus"  clearable class="loginInput"></el-input>
        <el-input placeholder="请输入密码" v-model="password" @focus="getFocus" show-password class="loginInput"></el-input>
        <div class="warn" v-if="loginWarn"><i class="iconfont">&#xe8e7;</i>{{ loginWarnText }}</div>
        <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
      </div>
      <div class="page_login_right">
            <div><span class="highlight">聚合物音乐</span>将获得以下权限：</div>
            <div><el-checkbox label="全选" checked="checked"></el-checkbox></div>
            <div>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="获得您的昵称、头像、性别" disabled ></el-checkbox>
              </el-checkbox-group>
            </div>
            <div><el-checkbox label="访问应用里你的DC好友信息" checked="checked"></el-checkbox></div>
            <div >授权后表明你已同意 <span class="highlight">DC登录服务协议</span></div>
      </div>
    </div>
    <div class="page_login_footer">
      <div>
        <span>忘了密码?</span> | <span>注册新帐号</span> | <span>意见反馈</span>
      </div>

    </div>

  </div>


</template>

<script>
import {userLoginApi} from "@/api/usersApi";
import {mapMutations} from 'vuex'

export default {
  name:'Login',
  data(){
    return{
      username:'',
      password:'',
      checkList:['获得您的昵称、头像、性别'],
      loginWarn:false,
      loginWarnText:''
    }
  },
  methods:{
    ...mapMutations(['userLogin']),
    // 获取焦点
    getFocus(){
      let inputs = document.querySelectorAll('.el-input__inner')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.border = '1px solid #DCDFE6'
        this.loginWarn = false
      }
    },
    // 点击登录
    async login(){
      let {data:res} = await userLoginApi(this.username,this.password)
      let inputs = document.querySelectorAll('.el-input__inner')
      if (this.username.trim() ==='' || this.password === ''){
        this.loginWarn=true
        this.loginWarnText = '用户名或密码不能为空'
      }else{
        if (res.code>=200 && res.code<300){
          localStorage.setItem('token','Bearer '+res.tokenKey)
          this.userLogin({
            id:res.data[0].id,
            username:res.data[0].username,
            user_str:res.data[0].user_str,
            user_img:res.data[0].user_img
          })
          this.$emit('closeDialog',false)
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''
          }
        }else {
          this.loginWarn=true
          this.loginWarnText = res.text
          localStorage.removeItem('token')
        }
      }
      if (this.loginWarn===true){
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].style.border = '1px solid red'
        }
      }
    }


  }
}
</script>

<style lang="less" scoped>
.input(@height){
  width: 300px;
  height: @height;
  display: block;
  margin: 18px auto 0 auto;
}
.login-container{
  .highlight{
    color: #51B7EC;
    margin-right:5px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }

  .page_login_body{
    color: black;
    width: 100%;
    height: 310px;
    display: flex;
    .page_login_left{
      width: 65%;
      border-right: 1px solid #F2F2F2;
      .login_title{
        font-weight: 500;
        text-align: center;
        margin:16px 0 ;
      }
      .loginInput{
        .input(35px);
      }
      .loginBtn{
        .input(45px);
      }
      .warn{
        color: red;
        width: 300px;
        margin: 4px auto 0 auto;
        i{
          width: 10px;
          height: 10px;
          font-size: 8px;
          margin-right: 5px;
        }
      }
    }
    .page_login_right{
      font-size: 13px;
      width: 35%;
      padding: 30px 20px;
      >div{
        padding: 8px 0;
        &:nth-child(-n+3){
          border-top:1px solid #F2F2F2;
        }
        &:last-child{
          margin-top: 16px;
        }
        /deep/ .el-checkbox__label{
          font-size: 13px!important;
        }
      }
    }
  }

  .page_login_footer{
    height: 60px;
    width: 100%;
    position: relative;
    div{
      position: absolute;
      top: 0;
      left: 170px;
      span{
        font-size: 14px;
        margin: 0 10px;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }

  }
}

</style>
