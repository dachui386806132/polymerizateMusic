<template>
  <div class="dialog-container">
    <div class="dialog_title_tab">
      <span :class="choiceTab===0?'tab_active':''" @click="choiceTab1">账号登录</span>
      <span :class="choiceTab===1?'tab_active':''" @click="choiceTab2">账号注册</span>
    </div>
        <component :is="comName" @changeDialogBody="getBody" @closeDialog="closeDialog"></component>
  </div>
</template>

<script>
import Login from "@/components/Header/Container/Login";
import Register from "@/components/Header/Container/Register";
export default {
  name:'Login',
  data(){
    return{
      choiceTab:0,
      comName:Login
    }
  },
  methods:{
    closeDialog(val){
      this.$emit('closeDialog',val)
    },
    choiceTab1(){
      this.choiceTab= 0
      this.comName = Login
    },
    choiceTab2(){
      this.choiceTab= 1
      this.comName = Register
    },
    getBody(val){
      if (val==='Login'){
        this.choiceTab1()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .dialog-container{
    height: 480px;
    width: 100%;
    .dialog_title_tab{
      width: 60%;
      height: 50px;
      border-bottom: 1px solid #F2F2F2;
      display: flex;
      justify-content: space-around;
      padding: 0 20%;
      >span{
        font-weight: 400;
        display: block;
        width: 100px;
        cursor: pointer;
        font-size:17px;
        height: 100%;
        line-height: 50px;
        text-align: center;
        &:hover{
          color: #31c27c;
        }
      }
      .tab_active{
        color: #31c27c;
      }
    }
  }
</style>
