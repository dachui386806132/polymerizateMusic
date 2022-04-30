<template>
  <div class="register-container">
    <div class="page_register_body">

      <div class="page_register_left">
        <h1 class="register_title">注册账号</h1>
        <h3 class="register_title">请注意账号密码输入规范</h3>
        <el-input placeholder="请输入账号" v-model="username" @focus="inputHandlerF($event,1)" @blur="inputHandlerB($event,1)" clearable class="registerInput"></el-input>
        <div class="warn" v-if="usernameWarn"><i class="iconfont">&#xe8e7;</i>{{ usernameWarnText }}</div>
        <el-input placeholder="请输入密码" v-model="password" @focus="inputHandlerF($event,2)" @blur="inputHandlerB($event,2)" show-password class="registerInput"></el-input>
        <div class="warn" v-if="passwordWarn"><i class="iconfont">&#xe8e7;</i>{{ passwordWarnText }}</div>
        <el-input placeholder="请再次输入密码" v-model="againPassword" @focus="inputHandlerF($event,3)" @blur="inputHandlerB($event,3)" show-password class="registerInput"></el-input>
        <div class="warn" v-if="againPasswordWarn"><i class="iconfont">&#xe8e7;</i>{{ againPasswordWarnText }}</div>
        <el-button type="primary" class="registerBtn" @click="Register" :plain="true">注册账号</el-button>
      </div>

      <div class="page_register_right">
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
    <div class="page_register_footer">
      <div>
        <span>注册规范</span> | <span>注册须知</span> | <span>意见反馈</span>
      </div>

    </div>
  </div>
</template>

<script>
import {getIsUserApi, insertUserApi} from "@/api/usersApi";

export default {
  name:'Register',
  data(){
    return{
      username:'',
      password:'',
      againPassword:'',
      checkList:['获得您的昵称、头像、性别'],
      usernameZ:/^[A-Za-z0-9]{6,14}$/,
      passwordZ:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/,
      usernameWarn:false,
      passwordWarn:false,
      againPasswordWarn:false,
      usernameWarnText:'',
      passwordWarnText:'',
      againPasswordWarnText:'',
    }
  },

  methods:{
    // 表单验证--获取焦点
    inputHandlerF(e,num){
     if (num===1){
       e.target.style.border= '1px solid #409EFF'
       this.usernameWarn=false
     }else if(num===2){
       e.target.style.border= '1px solid #409EFF'
       this.passwordWarn=false
     }else if(num===3){
       e.target.style.border= '1px solid #409EFF'
       this.againPasswordWarn=false
     }
    },

    // 表单验证--失去焦点
    inputHandlerB(e,num){
      if (num===1){
        if(this.username.trim()===''){
          this.usernameWarn= true
          this.usernameWarnText= '账号不能为空'
          e.target.style.border= '1px solid red'
        }else if (!this.usernameZ.test(this.username.trim())){
          this.usernameWarn= true
          this.usernameWarnText= '账号必须为6-14位的数字和字母'
          e.target.style.border= '1px solid red'
        }else {
          this.requestIsUser(e)
        }
      }else if(num===2){
        if(this.password.trim()===''){
          this.passwordWarn= true
          this.passwordWarnText= '密码不能为空'
          e.target.style.border= '1px solid red'
        }else if (!this.passwordZ.test(this.password.trim())){
          this.passwordWarn= true
          this.passwordWarnText= '密码必须包含数字和字母,长度在6~18之间'
          e.target.style.border= '1px solid red'
        }else {
          this.passwordWarn= false
          e.target.style.border= '1px solid #DCDFE6'
        }
      }else if(num===3){
        if(this.againPassword.trim()===''){
          this.againPasswordWarn= true
          this.againPasswordWarnText= '密码不能为空'
          e.target.style.border= '1px solid red'
        }else if (this.password!== this.againPassword.trim()){
          this.againPasswordWarn= true
          this.againPasswordWarnText= '两次密码输入不一致'
          e.target.style.border= '1px solid red'
        }else {
          this.againPasswordWarn= false
          e.target.style.border= '1px solid #DCDFE6'
        }
      }
    },

    // 判断用户名是否被注册
    async requestIsUser (e) {
      let {data:res} = await getIsUserApi(this.username)
      if (res.data.length>=1){
        this.usernameWarn= true
        this.usernameWarnText= '此账号已被注册！'
        e.target.style.border= '1px solid red'
      }else {
        this.usernameWarn= false
        e.target.style.border= '1px solid #DCDFE6'
      }
    },

    // 点击注册按钮
    async Register(){
      let {data:res} = await getIsUserApi(this.username)
      let inputs = document.querySelectorAll('.el-input__inner')
      this.inputHandlerB({target:inputs[0]},1)
      this.inputHandlerB({target:inputs[1]},2)
      this.inputHandlerB({target:inputs[2]},3)
      if (!this.usernameWarn&& !this.passwordWarn&& !this.againPasswordWarn&& res.data.length===0){
        let {data:res} = await insertUserApi(this.username,this.password)
        if (res.code>=200&&res.code<300){
          this.cleanInput(inputs)
          this.$message({
            message: `注册成功,聚合物欢迎你！3秒后会跳转到登录页`,
            type: 'success',
            duration:3000
          });
          // 切换到登录界面
          setTimeout(()=>{
            this.$emit('changeDialogBody', 'Login')
          },3000)
        }else {
          this.cleanInput(inputs)
          this.$message.error('服务器请求失败');
        }
      }else {

      }
    },

    // 清除输入框数据
    cleanInput(inputs){
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value=''
      }
    }
  },
}
</script>

<style lang="less" scoped>
.input(@height){
  width: 300px;
  height: @height;
  display: block;
  margin: 15px auto 0 auto;
}
.register-container{
  .highlight{
    color: #51B7EC;
    margin-right:5px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }

  .page_register_body{
    color: black;
    width: 100%;
    display: flex;
    .page_register_left{
      width: 65%;
      border-right: 1px solid #F2F2F2;
      .register_title{
        font-weight: 500;
        text-align: center;
        margin:16px 0 ;
      }
      .registerInput{
        .input(35px);
      }
      .registerBtn{
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
    .page_register_right{
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

  .page_register_footer{
    height: 60px;
    width: 100%;
    position: relative;
    div{
      position: absolute;
      top: 30px;
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
