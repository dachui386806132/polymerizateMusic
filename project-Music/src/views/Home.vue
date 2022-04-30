<template>
  <div id="home-container">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
    <my-back-top></my-back-top>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import BackTop from "@/components/utils/BackTop";
export default {
  data(){
    return{

    }
  },
  components:{
    'my-header':Header,
    'my-footer':Footer,
    'my-back-top':BackTop
  }
}
</script>

<style lang="less" scoped>

</style>
