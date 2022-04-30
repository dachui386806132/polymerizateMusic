<template>
  <div class="not-find-container">
    <span> 什么也没有，去<span class="green" @click="$router.push('/home')">音乐馆</span>发现好音乐！</span>
  </div>
</template>

<script>
export default {
  name:'NotFind',
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.not-find-container{
  height: 300px;
  width: 1200px;
  margin: auto;
  text-align: center;
  line-height: 300px;
  .green{
    color: #3bd389;
    cursor: pointer;
    font-size: 30px;
  }
}

</style>

