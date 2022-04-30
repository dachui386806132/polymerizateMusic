<template>
  <div class="song-progress-container">
    <div class="player_music__info" >
      <div v-if="$store.state.songMsg">
        <span class="song_name">{{ $store.state.songMsg.name }}</span>
         -
        <span class="author_name">{{ $store.state.songMsg.ar[0].name}}</span>
      </div>
      <div v-if="$store.state.songMsg">
        <span class="move_time">{{ nowDate | handlerTime }}</span> / <span class="final_time">{{  this.$store.state.songMsg.dt | handlerTime }}</span>
      </div>
    </div>
    <div class="player_progress">
      <div class="block">
        <el-slider v-model="value"  class="progress_btn" ref="myProgress" :show-tooltip="false"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['playTime'],
  name:'SongProgress',
  data(){
    return{
      value:0,
      nowDate:0
    }
  },
  watch:{
    // 计算时间
    playTime(newVal){
      this.nowDate = parseInt(newVal*1000)
      this.value = parseFloat((newVal*100/(this.$store.state.songMsg.dt/1000).toFixed(2)).toFixed(3))
    },
  },
  mounted() {
      // 传输进度条值
     this.$refs.myProgress.$el.querySelector('.el-slider__runway').addEventListener('click', this.clickSendVal)
     this.$refs.myProgress.$el.querySelector('.el-slider__button-wrapper').addEventListener('mousedown',this.sendVal)

  },
  methods:{
    // 传输点击进度条值
    clickSendVal(){
        this.$nextTick(()=>{
          this.$emit('changeProgressWidth',this.value)
        })
    },
    // 传输拖动进度条值
    sendVal(e){
      e.stopPropagation()
      this.$emit('stopInterval',false)
      let mouseUp
      let mouseMove
      document.addEventListener('mousemove',mouseMove=()=>{
        this.nowDate = parseInt(this.value/100*this.$store.state.songMsg.dt)
      })
      document.addEventListener('mouseup',mouseUp=()=>{
        this.$emit('changeProgressWidth',this.value)
        this.$emit('stopInterval',true)
        document.removeEventListener('mouseup',mouseUp)
        document.removeEventListener('mousemove',mouseMove)
      })
    }
  }

}
</script>

<style lang="less" scoped>
.song-progress-container{
  width: 640px;
  height: 100%;
  color: hsla(0,0%,88.2%,.8);
  .player_music__info{
    display: flex;
    justify-content: space-between;
    height: 19.2px;
    &>div:nth-child(1){
      &>span{
        cursor: pointer;
        &:hover{
          color: white;
        }
      }
    }
  }
  .progress_btn{

  }
}
/deep/ .el-slider__runway{
  margin-top: 6px;
  height:3px;
  background-color: rgba(228, 231, 237, 0.5);
}
/deep/ .el-slider__button{
  border: none;
  width: 10px;
  height: 10px;
}
/deep/ .el-slider__bar{
  height: 3px;
  background-color: #DBD7D4;
}
/deep/ .el-slider__button-wrapper{
  top: -17px;
}
/deep/ .el-slider::after, .el-slider::before{
  //display: none;
}
/deep/ .el-slider__button-wrapper .el-tooltip, .el-slider__button-wrapper::after{
  //display: none;
}
</style>
