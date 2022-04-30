<template>
  <div class="header-container">
    <my-logo></my-logo>
    <my-nav></my-nav>
    <my-search></my-search>
    <my-login-mod></my-login-mod>
  </div>
</template>

<script>
import Logo from "@/components/Header/Container/Logo";
import Search from "@/components/Header/Container/SearchBtn";
import NavBtn from "@/components/Header/Container/Navbtn";
import LoginMod from "@/components/Header/Container/LoginMod";
export default {
  name:'Header',
  data(){
    return{

    }
  },
  methods:{
  },
  components:{
    'my-logo':Logo,
    'my-search':Search,
    'my-nav':NavBtn,
    'my-login-mod':LoginMod
  }
}
</script>

<style lang="less" scoped>
/deep/ a {
  text-decoration: none;
}

  .header-container{
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    max-width: 1200px;
    height: 90px;
    margin: auto;
    position: relative;
  }
</style>
