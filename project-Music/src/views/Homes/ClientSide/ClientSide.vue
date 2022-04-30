<template>
  <div class="clientSide-container">
    <img :src="littleLogo" alt="" class="littleImg">
    <div class="clientSide_msg_box">
      <div class="clientSide_center_msg">
        <div>聚合物音乐 PC客户端</div>
        <div>海量高品质音乐尽享</div>
        <div>敬请期待</div>
      </div>
    </div>
    <div class="clientSide_animation_box">

    </div>
  </div>
</template>

<script>
export default {
  name:'ClientSide',
  data(){
    return{
      littleLogo:require('@/assets/img/littleLogo.png')
    }
  }
}
</script>

<style lang="less" scoped>
.clientSide-container{
  background-image: url("../../../assets/img/banner_pc.jpg");
  background-size: 100%;
  height: 100vh;
  position: relative;
  font-weight: 400;
  .clientSide_msg_box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding-top: 170px;
    .clientSide_center_msg{
      text-align: center;
      color: white;
      &>div:nth-child(1){
        font-size: 70px;
      }
      &>div:nth-child(2){
        font-size:50px;
      }
      &>div:nth-child(3){
        margin:60px auto 0 auto;
        width: 293px;
        height: 69px;
        background-color: #31C27C;
        cursor: pointer;
        border-radius: 50px;
        line-height: 69px;
        font-size: 30px;
        &:hover{
          background-color: #3eda8d;
        }
      }
    }
  }
  .clientSide_animation_box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .littleImg{
    position: absolute;
    top: 25px;
    left: 25px;
    width: 50px;
  }

}
</style>
