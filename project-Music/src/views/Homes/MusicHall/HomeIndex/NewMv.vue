<template>
  <div class="new-mv-container">
    <MoveBox :title="'MV'" :page="page" :type="6">

      <template v-slot:titleBtn>
        <div class="mv_title_box">
          <span @click="changeColor('',$event)" id="choice">全部</span>
          <span @click="changeColor('内地',$event)">内地</span>
          <span @click="changeColor('港台',$event)">港台</span>
          <span @click="changeColor('欧美',$event)">欧美</span>
          <span @click="changeColor('韩国',$event)">韩国</span>
          <span @click="changeColor('日本',$event)">日本</span>
        </div>
      </template>

      <template v-slot:center>
        <div v-loading="loading" v-if="loading" class="loading_box">

        </div>
        <div class="main_box" v-else ref="main_box">
          <div class="main_mv_page" v-for="(item,index) in mvs" v-if="mvs" :key="index">
            <div class="mv_item" v-for="(cItem,cIndex) in item.value" @click="openMv(cItem.id)" :key="cIndex">
              <div class="song_list_img">
                <img v-lazy="cItem.cover" :key="cItem.cover" :alt="cItem.name" >
                <div class="play_btn">
                  <i class="iconfont play_icon">&#xe615;</i>
                </div>
              </div>
              <div class="song_list_msg">
                <div>{{ cItem.name }}</div>
                <div>{{ cItem.artistName}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </MoveBox>
  </div>
</template>

<script>
import {getNewMv} from "@/api";
import {mapMutations} from "vuex";
import MoveBox from "@/views/Homes/MusicHall/Little/MoveBox";

export default {
  name:'NewMv',
  components:{
    MoveBox
  },
  data(){
    return{
      mvs:null,
      page:0,
      loading:false
    }
  },
  created() {
    this.getMsg('')
  },
  mounted() {

  },
  methods:{
    ...mapMutations(['openMv']),
    // 获取主页需要的数据
    async getMsg(area){
      this.loading = true
      this.areaType = area
      let {data:res} = await getNewMv(40,area)
      this.distribution(res.data)
      this.page = 999
      this.$nextTick(()=>{
        this.page = Math.ceil(res.data.length/8)
      })
      this.loading = false
      this.$nextTick(()=>{
        this.$refs.main_box.style.width = Math.ceil(res.data.length/8) * 1200 + 'px'
      })
    },
    // 点击按钮改变颜色
    changeColor(area,e){
      let btns = document.querySelector('.mv_title_box').children
      for (let i = 0; i < btns.length; i++) {
        btns[i].removeAttribute('id')
      }
      e.target.setAttribute('id','choice')
      this.getMsg(area)
    },

    distribution(mv){
      let myPage = Math.ceil(mv.length/8)
      let arr = []
      for (let i = 0; i < myPage; i++) {
        let obj = mv.filter((item,index)=>index>=i*8 && index <(i+1)*8)
        arr.push({value:obj})
      }
      this.mvs = arr
    }
  }
}
</script>

<style lang="less" scoped>
.new-mv-container{
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  /deep/.el-loading-mask{
    background-color: rgba(247, 247, 247, 0);
  }
  .loading_box{
    width: 1300px;
    margin: auto;
    height: 200px;
  }
  .main_mv_page{
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
  #choice{
    color: #3bd389;
  }
  .mv_title_box{
    width: 600px;
    margin:0 auto 24px auto;

    span{
      display: inline-block;
      width: 100px;
      text-align: center;
      cursor: pointer;
      &:hover{
        color: #3bd389;
      }
    }
  }
  .main_box{
    display: flex;
    flex-wrap: wrap;
    .mv_item{
      user-select: none;
      width: 285px;
      height: 223px;
      margin-bottom: 20px;
      margin-right:15px;
      .song_list_img{
        width:285px;
        height: 160px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        >img{
          transition:all .5s ease;
        }
        &:hover{
          &>img{
            width: 300px;
            height: 170px;
            margin-left: -8px;
            margin-top: -8px;
          }
          &>.play_btn{
            opacity: 1;
            &>.play_icon{
              width: 59px;
              height: 59px;
              line-height: 59px;
              font-size: 28px;
              margin: 48px auto 0 auto;
            }
          }
        }
        &>img{
          width:285px;
          height: 160px;
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
            width: 35px;
            height: 35px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:35px;
            border-radius: 100%;
            color: #545454;
            font-size: 20px;
            margin: 60px auto 0 auto;
          }
        }
      }

      .song_list_msg{
        font-size: 14px;
        margin-top: 10px;
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
</style>
