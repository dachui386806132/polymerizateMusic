<template>
  <div class="openness-container">
    <div class="openness_item_1">DC聚合物开放平台</div>
    <div class="openness_item_2"></div>
  </div>
</template>

<script>
export default {
  name:'Openness',
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
  .openness-container{
    height: 100vh;
    background-image: url("../../../assets/img/bg_openness.jpg");
    background-size: 100%;
    position: relative;
    &>div{
      width: 500px;
      text-align: center;
      color: white;
    }
    .openness_item_1{
      position: absolute;
      left: 33%;
      top: 70px;
      font-size:25px;
      letter-spacing: 10px;
      animation: title1 2s 1s forwards;
      opacity: 0;
    }
    .openness_item_2{
      position: absolute;
      left: 33%;
      top: 170px;
      height: 300px;
      background-image: url("../../../assets/img/sprite_top_b24c015.png");
      background-size: 130%;
      background-position:40px -30px ;
      background-repeat: no-repeat;
      animation: title2 2s 2s forwards;
      opacity: 0;
    }

  }
  @keyframes title1 {
    from{
      top: 70px;
    }to{
      top: 120px;
      opacity: 1;
    }
  }
  @keyframes title2 {
    from{
      top: 170px;
    }to{
       top: 220px;
       opacity: 1;
     }
  }
</style>
