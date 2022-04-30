<template>
  <div class="song-not-find-container" ref="main">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props:['myHeight','myWidth','text'],
  name:'SongNotFind',
  data(){
    return{
    }
  },
  mounted() {
    this.setStyle()
  },
  methods:{
    setStyle(){
      console.log(this.myHeight)
      console.log(this.myWidth)
      this.$refs.main.style.height = this.myHeight +'px'
      this.$refs.main.style.width = this.myWidth+'px'
      this.$refs.main.style.lineHeight = this.myHeight+'px'
    }
  }
}
</script>

<style lang="less" scoped>
.song-not-find-container{
  margin: auto;
  text-align: center;
  line-height: 300px;
}

</style>

