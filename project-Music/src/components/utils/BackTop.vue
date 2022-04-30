<template>
  <div class="back-top-container">
    <div title="回到顶部" v-if="isOverstep" @click="jump">
      <i class="iconfont">&#xe63c;</i>
    </div>
    <div title="听歌列表" @click="openListen">
      <i class="iconfont">&#xe636;</i>
    </div>
  </div>
</template>

<script>
export default {
  name:'BackTop',
  data(){
    return{
      isOverstep:false
    }
  },
  created() {
    this.setBtn()
  },
  methods:{
    // 给按钮添加事件
    setBtn(){
      window.addEventListener('scroll',(e)=>{
        let sTop = document.documentElement.scrollTop||document.body.scrollTop
        this.isOverstep = sTop >= 350;
      })
    },
    jump () {
      let jump = document.querySelector('.header-container')
      // 获取需要滚动的距离
      let total = jump.offsetTop
      // Chrome
      document.body.scrollTop = total
      // Firefox
      document.documentElement.scrollTop = total
      // Safari
      window.pageYOffset = total
    },
    openListen(){
      window.open('http://localhost:8080/play','_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.back-top-container{
  position: fixed;
  width: 42px;
  right: 20px;
  bottom: 50px;
  &>div:nth-child(2){
    margin-top: 2px;
  }
  div{
    width: 40px;
    height: 40px;
    border: 1px solid #c9c9c9;
    background-color: white;
    line-height: 40px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    border-radius: 3px;
    color: #6c6c6c;
    &:hover{
      background-color: #EDEDED;
    }
  }
}
</style>
