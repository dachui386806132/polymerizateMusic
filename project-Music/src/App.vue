<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getIsLoginApi} from "@/api/usersApi";
  export default {
    data(){
      return{

      }
    },
    methods:{
      ...mapActions(['getUserMsg']),
    },
    created(){
      this.getUserMsg()
    },
    computed:{
    }
  }
</script>

<style lang="less" scoped>
  .app{
    overflow: hidden;
  }
</style>
