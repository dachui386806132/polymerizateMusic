<template>
  <div class="home-singer-container">
    <div class="home_singer_title"></div>
    <div class="home_singer_center_box">
      <div class="home_singer_choice_box">
        <div class="singer_choice_line">
          <span class="choice_title"   @click="changSearch(1,-1)">全部</span>
          <span @click="changSearch(1,'A')">A</span>
          <span @click="changSearch(1,'B')">B</span>
          <span @click="changSearch(1,'C')">C</span>
          <span @click="changSearch(1,'D')">D</span>
          <span @click="changSearch(1,'E')">E</span>
          <span @click="changSearch(1,'F')">F</span>
          <span @click="changSearch(1,'G')">G</span>
          <span @click="changSearch(1,'H')">H</span>
          <span @click="changSearch(1,'I')">I</span>
          <span @click="changSearch(1,'J')">J</span>
          <span @click="changSearch(1,'K')">K</span>
          <span @click="changSearch(1,'L')">L</span>
          <span @click="changSearch(1,'M')">M</span>
          <span @click="changSearch(1,'N')">N</span>
          <span @click="changSearch(1,'O')">O</span>
          <span @click="changSearch(1,'P')">P</span>
          <span @click="changSearch(1,'Q')">Q</span>
          <span @click="changSearch(1,'R')">R</span>
          <span @click="changSearch(1,'S')">S</span>
          <span @click="changSearch(1,'T')">T</span>
          <span @click="changSearch(1,'U')">U</span>
          <span @click="changSearch(1,'V')">V</span>
          <span @click="changSearch(1,'W')">W</span>
          <span @click="changSearch(1,'X')">X</span>
          <span @click="changSearch(1,'Y')">Y</span>
          <span @click="changSearch(1,'Z')">Z</span>
          <span @click="changSearch(1,'#')">#</span>
        </div>
        <div class="singer_choice_line">
          <span class="choice_title"  @click="changSearch(2,-1)">全部</span>
          <span @click="changSearch(2,1)">男歌手</span>
          <span @click="changSearch(2,2)">女歌手</span>
          <span @click="changSearch(2,3)">乐队</span>
        </div>
        <div class="singer_choice_line">
          <span class="choice_title"  @click="changSearch(3,-1)">全部</span>
          <span @click="changSearch(3,7)">华语</span>
          <span @click="changSearch(3,96)">欧美</span>
          <span @click="changSearch(3,8)">日本</span>
          <span @click="changSearch(3,16)">韩国</span>
          <span @click="changSearch(3,0)">其他</span>
        </div>
      </div>
      <div class="home_singer_list_box" v-if="singers">
        <div v-loading="loading" v-if="loading" class="loading_box"></div>
        <div v-else>
          <div class="home_singer_list_first">
            <div class="singer_list_item" v-for="item in singers.first">
              <div class="singer_list_item_img_box">
                <img v-lazy="item.picUrl" :key="item.picUrl" alt="" class="singer_img" @click="openSinger(item.id)">
              </div>
              <span class="singer_name"  @click="openSinger(item.id)">{{ item.name }}</span>
            </div>
          </div>
          <div class="home_singer_list_last">
            <div class="home_singer_list_last_item" v-for="item in singers.last">
              <span @click="openSinger(item.id)">{{ item.name }}</span>
            </div>
          </div>
        </div>



      </div>
    </div>

  </div>
</template>

<script>
import {getTypeSinger} from "@/api/searchApi";
import {mapMutations} from "vuex";

export default {
  name:'HomeSinger',
  data(){
    return{
      initial:-1,
      type:-1,
      area:-1,
      limit:99,
      offset:0,
      singers:null,
      loading:false
    }
  },
  methods:{
    ...mapMutations(['openSinger']),
    // 改变搜索的数据
    changSearch(type,val){
      if (type===1){
        this.initial = val
      }else if(type===2){
        this.type = val
      }else if(type===3){
        this.area = val
      }
    },

    // 搜索
    async searchSinger(){
      this.loading = true
      let {data:res} =await getTypeSinger(this.initial,this.type,this.area,this.limit,this.offset)
      let first = res.artists.filter((item,index)=>index<10)
      let last = res.artists.filter((item,index)=>index>10)
      let obj = {first,last}
      this.singers = obj
      this.loading = false
    },

    // 设置按钮样式
    setBtn(){
      let lines = document.querySelectorAll('.singer_choice_line')
      console.log(lines)
      for (let i = 0; i < lines.length; i++) {
        let linesBtnS = lines[i].querySelectorAll('span')
        for (let j = 0; j < linesBtnS.length; j++) {
          linesBtnS[j].addEventListener('click',()=>{
            for (let k = 0; k < linesBtnS.length; k++) {
              linesBtnS[k].removeAttribute('id')
            }
            linesBtnS[j].setAttribute('id','singer_tag_select--'+(i+1))
          })
          if (linesBtnS[j].className === 'choice_title'){
            linesBtnS[j].setAttribute('id','singer_tag_select--'+(i+1))
          }
        }
      }
    }
  },
  watch:{
    initial(){
      this.searchSinger()
    },
    type(){
      this.searchSinger()
    },
    area(){
      this.searchSinger()
    }
  },
  created() {
    this.searchSinger()
  },
  mounted() {
    this.setBtn()
  }
}
</script>

<style lang="less" scoped>
.home-singer-container{
  font-size: 14px;
  .home_singer_title{
    position: relative;
    width: 100%;
    height: 376px;
    overflow: hidden;
    background: url("../../../assets/img/bg_singer.webp")50% 0 repeat-x ;
  }
  .home_singer_center_box{
    width: 1200px;
    margin:40px auto;
    .home_singer_choice_box{
      user-select: none;
      padding:20px 35px;
      .singer_choice_line{
        #singer_tag_select--1{
          background-color: #31c27c!important;
          color: #fff!important;
        }
        #singer_tag_select--2{
          background-color: #31c27c!important;
          color: #fff!important;
        }
        #singer_tag_select--3{
          background-color: #31c27c!important;
          color: #fff!important;
        }
        margin-bottom:18px;
        &>.choice_title{
          margin-right: 20px;
        }
        &>span:not(:first-child){
          margin-right: 14px;
        }
        span{
          padding: 2px 8px;
          height: 26px;
          display: inline-block;
          text-align: center;
          line-height: 26px;
          &:hover{
            color: #3bd389;
            cursor: pointer;
          }
        }
      }
    }
    .home_singer_list_box{
      .home_singer_list_first{
          width: 1200px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        flex-wrap: wrap;
          .singer_list_item{
            width: 224px;
            height: 245px;
            text-align: center;
            .singer_list_item_img_box{
              width: 224px;
              height: 140px;
            }
            .singer_img{
              display: block;
              width: 140px;
              height: 140px;
              margin: auto;
              border-radius: 100%;
              cursor: pointer;
            }
            .singer_name{
              display: inline-block;
              margin-top: 15px;
              cursor: pointer;
              &:hover{
                color: #3bd389;
              }
            }
          }
      }
      .home_singer_list_last{
        .home_singer_list_last_item{
          width: 25%;
          margin-bottom: 20px;
          display: inline-block;
          text-align: center;
          span{
            cursor: pointer;
            &:hover{
              color: #3bd389;
            }
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
