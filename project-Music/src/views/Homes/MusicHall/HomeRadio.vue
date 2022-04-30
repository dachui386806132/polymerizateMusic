<template>
  <div class="home-radio-container">
    <div v-loading="loading" v-if="loading" class="loading_box"></div>
    <div v-else>
      <div class="home_radio_title">热门推荐</div>
      <div  class="home_radio_box">
        <div class="album_item" v-for="item in radios">
          <div class="album_img">
            <img v-lazy="item.picUrl" :key="item.picUrl" alt="">
            <div class="play_btn" @click="warning">
              <i class="iconfont play_icon" @click="warning">&#xe615;</i>
            </div>
          </div>
          <div class="album_msg">
            <div @click="warning">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getDjDetail, getPersonalized} from "@/api/searchApi";

export default {
  name:'HomeRadio',
  data(){
    return{
      radios:null,
      loading:false
    }
  },
  created() {
    this.getMsg()
  },
  methods:{
    async getMsg(){
      this.loading = true
      let {data:res} =await getPersonalized()
      this.radios = res.djRadios
      this.loading = false
    },
    warning(e) {
      e.stopPropagation()
      this.$notify.error({
        title: '聚合物提示',
        message: '本站电台系统不可用'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.home-radio-container{
  width: 1200px;
  margin: auto;
  .home_radio_title{
    font-size: 22px;
    padding: 10px 0;
  }
  .home_radio_box{
    display: flex;
    flex-wrap: wrap;
    .album_item{
      user-select: none;
      width: 224px;
      height: 283px;
      margin-right: 16px;
      margin-bottom: 20px;
      .album_img{
        width: 224px;
        height: 224px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        &:hover{
          &>img{
            width: 240px;
            height: 240px;
            margin-left: -8px;
            margin-top: -8px;
          }
          &>.play_btn{
            opacity: 1;
            &>.play_icon{
              width: 66px;
              height: 66px;
              line-height: 66px;
              font-size: 30px;
              margin: 79px auto 0 auto;
            }
          }
        }
        &>img{
          width: 224px;
          height: 224px;
          transition: all .5s ease;
        }

        .play_btn{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all .5s ease;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.15);
          .play_icon{
            transition: all .5s ease;
            width: 40px;
            height: 40px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:40px;
            border-radius: 100%;
            color: #545454;
            font-size: 20px;
            margin: 92px auto 0 auto;
          }
        }
      }

      .album_msg{
        font-size: 14px;
        margin-top: 15px;
        &>div{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 22px;
          font-size: 14px;
          &:nth-child(1){
            cursor: pointer;
            &:hover{
              color: #31C27C;
            }
          }
          &:nth-child(2){
            color: #999;
          }
        }

      }
    }
  }
}
.loading_box{
  width: 1200px;
  margin: auto;
}
/deep/.el-loading-mask{
  background-color: #F4F4F4;
}
</style>
