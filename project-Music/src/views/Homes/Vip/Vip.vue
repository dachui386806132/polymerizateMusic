<template>
  <div class="vip-container">
    <div class="vip_title1">金刚钻豪华版</div>
    <div class="vip_title2">音乐,更优悦</div>
    <div class="vip_title3">暂未开放</div>
  </div>
</template>

<script>
export default {
  name:'Vip',
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.vip-container{
  height: 100vh;
  background-image: url("../../../assets/img/banner_thumb_1.jpg");
  background-size: 100%;
  color: white;
  position: relative;
  &>div{
    width: 600px;
    text-align: center;
    left: 450px;
  }
  .vip_title1{
    position: absolute;
    top: 200px;
    font-size: 100px;
    letter-spacing: 2px;
    animation: title1 .1s 1s forwards;
    opacity: 0;
  }
  .vip_title2{
    position: absolute;
    top: 320px;
    letter-spacing: 10px;
    font-size: 23px;
    animation: title2 .1s 1.3s forwards;
    opacity: 0;
  }
  .vip_title3{
    left:604px;
    position: absolute;
    top: 373px;
    width: 260px;
    height: 62px;
    background-color: #31C27C;
    cursor: pointer;
    border-radius: 50px;
    line-height: 62px;
    font-size: 33px;
    opacity: 0;
    animation: title3 .1s 1.3s forwards;
    &:hover{
      background-color: #3eda8d;
    }
  }
}
@keyframes title1 {
  from{
    font-size: 100px;
  }to{
     font-size: 80px;
     opacity: 1;
   }
}
@keyframes title2 {
  from{
    font-size: 33px;
  }to{
     font-size: 23px;
     opacity: 1;
   }
}
@keyframes title3 {
  from{
    left:604px;

    width: 292px;
    height: 69px;
    top: 370px;
  }to{
     left:616px;
     width: 260px;
     height: 62px;
     opacity: 1;
     top: 373px;
   }
}
</style>
